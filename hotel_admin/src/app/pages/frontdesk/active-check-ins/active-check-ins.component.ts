import { Component } from '@angular/core';
import { take } from 'rxjs';
import { PaginationService } from 'src/app/services/common/pagination.service';
import { SpinnerService } from 'src/app/services/common/spinner.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-active-check-ins',
  templateUrl: './active-check-ins.component.html',
  styleUrls: ['./active-check-ins.component.css']
})
export class ActiveCheckInsComponent {
  reservations = []
  showSpinner = false;
  editSalaryTopUp = false;
  showingArchive:boolean = false;
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  reservationDetails = false;
  loadedReservation:any = {}
  showComment = false;
  showTinySpinner = false;
  disable = false;
  showCheckOutModal = false;
  activeAccordionItem:any;
  serviceRoomBills:any = []
  room:any = {}
  loadedRoom:any = false;
  grandTotal = 0.00
  prepaidTotal = 0.00
  showModalSpinner = false
  firstInit = true

  constructor(
    private reservationService: ReservationService, 
    private paginationService: PaginationService,
    private spinnerService: SpinnerService,
    private hotelService: HotelService){}

  ngOnInit(){
    this.showSpinner = true;
    this.reservationService.getReservations('active-check-in').pipe(take(1)).subscribe((response:any)=>{
        console.log(response)
        this.alertMessage = response?.message;
        this.showSpinner = false;
        if(response.status){
          this.reservations = response.data
          console.log(this.reservations[0].rooms)
          this.paginationService.setLinks(response.next,response.last,'reservations-list','',this.is_search)
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#423f3f'; // Alert yellow color
          this.firstInit = false;
        }
        else{
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        }
        this.showAlert = true
      },
      (error: any) => {
        console.error('An error occurred in the subscription:', error);
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        this.showAlert = true
        // Handle the error here, if needed
      }
    );
    this.paginateSubscription()
  }

  ngAfterViewInit(){
    this.spinnerService.getSpinner().subscribe((status:any)=>{
      if(this.reservations.length == 0 && this.firstInit){
        status = true
      }
      console.log(this.reservations.length, this.firstInit)
      this.showSpinner = status
    })
  }

  toggleCheckOutModal(){
    this.showCheckOutModal = !this.showCheckOutModal;
    if(this.showCheckOutModal){
      return this.disableBodyScroll()
    }
    return this.enableBodyScroll()

  }

  paginateSubscription(){
    this.paginationService.dataEvent.subscribe((response: any) => {
      if(response.status){
        this.paginationService.setLinks(
                                        response.next,
                                        response.last,
                                        'reservations-list',
                                        response.query,
                                        this.is_search
                                        )
        this.reservations = response.data
      }
      else{}
    });
  }

  receivePaginationData(response:any){
    // this.customers$ = of(response?.data) || []
  }

  private getObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  private deleteObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    let newObj:any = []
    arr.forEach((arrObj)=>{
      console.log()
      if (arrObj.id != id){
        newObj.push(arrObj)
      }
    })
    console.log(newObj)
    return newObj
  }

  closeReservationDetails($event:any){
    this.reservationDetails = false;
  }

  storeReservation(){
    window.localStorage.setItem('reservation', JSON.stringify(this.loadedReservation))
  }

  showCommentWidget(){
    this.showComment = true;
  }

  showResrvationDetails($event:any){
    this.reservationDetails = true
    this.loadedReservation = this.getObjectFromArray(this.reservations,parseInt($event.target.closest('td').id))
  }

  startCheckOut(_type,room){
    this.loadedRoom = false;
    this.serviceRoomBills = []
    this.toggleCheckOutModal()
    if(room != '*'){
      this.getRoomServiceBills(room.room_no)
    }
    
    else{
      this.getReservationServiceBills(this.loadedReservation.reservation_token)
    }
  }

  setActive($event){
    
    let clicked:any = $event.target
    let el;
    if(clicked.nodeName === "A"){
      el = clicked.querySelector('h6')
    }
    else{el=clicked}
    let serviceBillId = clicked.id
    const accordionItem:any = document.getElementById(`accordion-item-${serviceBillId}`)
    console.log(accordionItem,`accordion-item-${serviceBillId}`)
    accordionItem.classList.toggle('collapse')
    
    if(this.activeAccordionItem == clicked.closest('a').id){
        el.style.color = '#364a63';
        this.activeAccordionItem = ''
        return
    }
    const accordionHeads:any  = document.querySelectorAll('.accordion-head')
    accordionHeads.forEach((accordionHead)=>{
      accordionHead.querySelector('h6').style.color = '#364a63'
    })
    if (el){el.style.color = 'rgb(236, 166, 177)';this.activeAccordionItem = el.closest('a').id}
    else{el.querySelector('h6').style.color = 'rgb(236, 166, 177)';this.activeAccordionItem = el.closest('a').id}

    
    
  }

  getRoomServiceBills(room:string){
    this.prepaidTotal = 0.00
    this.grandTotal = 0.00
    this.showModalSpinner = true
    this.hotelService.getServiceBills(room).pipe(
      take(1)
    ).subscribe((response:any)=>{
      this.showModalSpinner = false
      if(response.status){
        this.loadedRoom = room
        this.serviceRoomBills = response.data
        this.grandTotal = response.grand_total
        this.prepaidTotal = response.prepaid_total
        console.log(this.serviceRoomBills)
      }
    })
  }

  getReservationServiceBills(reservation_token:string){
    this.prepaidTotal = 0.00
    this.grandTotal = 0.00
    this.showModalSpinner = true
    this.hotelService.getServiceBills('',reservation_token).pipe(
      take(1)
    ).subscribe((response:any)=>{
      this.showModalSpinner = false
      if(response.status){
        this.serviceRoomBills = response.data
        this.grandTotal = response.grand_total
        this.prepaidTotal = response.prepaid_total
        console.log(this.serviceRoomBills)
      }
    })
  }

  checkOutContacts(room_no=null){
    // try{room.disable = true}
    // catch{}
    
    let rooms = []
    if (room_no == '*'){
      this.loadedReservation.rooms.forEach((room)=>{
        if(room.is_checked_in){
          rooms.push(room.room_no)
        }
      })
    }
    else{
      rooms.push(this.loadedRoom)
    }


        const data =  {'occupant':this.loadedReservation.contact.email,
                      'room':rooms,'reservation_token':this.loadedReservation.reservation_token
                      }
                      console.log(data)
        this.showTinySpinner = true
        this.reservationService.checkIn(data,'Checkout').subscribe((response:any)=>{
          this.alertMessage = response?.message;
          this.showTinySpinner = false;
          if(response.status){
            try{this.loadedRoom.is_checked_in = false}
            catch{}
            this.loadedReservation.num_checked_in = response['num_checked_in']
            this.alertDuration = 3000; // 5 seconds
            this.alertBackgroundColor = '#423f3f'; // Alert yellow color
          }
          else{
            // try{room.disable = false}
            // catch{}
            this.alertDuration = 3000; // 5 seconds
            this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
          }
          this.showAlert = true
        },
        (error: any) => {
          console.error('An error occurred in the subscription:', error);
          // try{room.disable = false}
          // catch{}
          this.showTinySpinner = false;
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
          this.showAlert = true
          // Handle the error here, if needed
        }
      );
    
  }

  disableBodyScroll(){
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  }

  enableBodyScroll(){
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

}

