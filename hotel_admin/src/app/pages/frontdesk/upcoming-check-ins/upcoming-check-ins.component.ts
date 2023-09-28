import { Component, Renderer2 } from '@angular/core';
import { take } from 'rxjs';
import { PaginationService } from 'src/app/services/common/pagination.service';
import { SpinnerService } from 'src/app/services/common/spinner.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
const PORT = 4200
const HOST = 'localhost'

@Component({
  selector: 'app-upcoming-check-ins',
  templateUrl: './upcoming-check-ins.component.html',
  styleUrls: ['./upcoming-check-ins.component.css']
})
export class UpcomingCheckInsComponent {
  reservations = []
  showSpinner = false;
  editSalaryTopUp = false
  showingArchive:boolean = false
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  reservationDetails = false
  loadedReservation:any = {}
  showComment = false
  showTinySpinner = false
  disable = false
  private srcValues:string[] = []

  constructor(
    private reservationService: ReservationService, 
    private paginationService: PaginationService,
    private spinnerService: SpinnerService,private renderer: Renderer2){
      this.srcValues = [
        `http://${HOST}:${PORT}/assets/js/bundlee5ca.js?ver=3.2.3`,
        `http://${HOST}:${PORT}/assets/js/scriptse5ca.js?ver=3.2.3`,
      ]
    }

  
    
  
  loadScript(src:string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.querySelector('#pending-reservation-root'), script);
  }

  ngOnInit(){
    this.showSpinner = true;
   
    this.reservationService.getReservations().pipe(take(1)).subscribe((response:any)=>{
        console.log(response)
        this.alertMessage = response?.message;
        this.showSpinner = false;
        if(response.status){
          this.reservations = response.data
          this.paginationService.setLinks(response.next,response.last,'reservations-list','',this.is_search)
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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
    setTimeout(()=>{
      this.srcValues.forEach((src)=>{
        this.loadScript(src);
      })
    },500)

    this.spinnerService.getSpinner().subscribe((status:any)=>{
      console.log(status)
      this.showSpinner = status
    })
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
    this.loadedReservation = this.getObjectFromArray(this.reservations,parseInt($event.target.id))
  }

  checkInContacts(_type:string,room){
    try{room.disable = true}
    catch{}
    
    let rooms = []
    if (room == '*'){
      this.loadedReservation.rooms.forEach((room)=>{
        rooms.push(room.room_no)
      })
    }
    else{
      rooms.push(room.room_no)
    }

    switch(_type){
      case 'single':
        const data =  {'occupant':this.loadedReservation.contact.email,
                      'room':rooms,'reservation_token':this.loadedReservation.reservation_token
                      }
        this.showTinySpinner = true
        this.reservationService.checkIn(data).subscribe((response:any)=>{
          this.alertMessage = response?.message;
          this.showTinySpinner = false;
          if(response.status){
            try{room.is_checked_in = true}
            catch{}
            rooms
            this.loadedReservation.rooms.forEach((room)=>{
              this.deleteObjectFromArray(this.loadedReservation.rooms,room.id)
            })
            
            this.loadedReservation.num_checked_in = response['num_checked_in']
            this.alertDuration = 3000; // 5 seconds
            this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
          }
          else{
            try{room.disable = false}
            catch{}
            this.alertDuration = 3000; // 5 seconds
            this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
          }
          this.showAlert = true
        },
        (error: any) => {
          console.error('An error occurred in the subscription:', error);
          try{room.disable = false}
          catch{}
          this.showTinySpinner = false;
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
          this.showAlert = true
          // Handle the error here, if needed
        }
      );
    }
  }
}
