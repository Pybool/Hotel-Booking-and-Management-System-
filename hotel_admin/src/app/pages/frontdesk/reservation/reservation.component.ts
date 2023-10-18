import { Component, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ContactService } from 'src/app/services/contacts/contact.service';
import { RatesService } from 'src/app/services/finance/rates.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

const PORT = 4200
const HOST = 'localhost'

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  isNaN = isNaN
  parseInt = parseInt
  public reservation:any = {}
  public showSpinner:Boolean = false;
  public showContactSpinner:Boolean = false;
  public showRoomSpinner:Boolean = false;
  public showRatesSpinner:Boolean = false;
  public showRoomTypeSpinner:Boolean = false;
  public showContactTypeSpinner:Boolean = false;
  public showManualRatesSpinner:Boolean = false;
  public roomChosen = true
  public contactChosen = true
  public roomTypes = []
  public rates = []
  public rooms = []
  public selectedRoomsClone = []
  public contactTypes = []
  public contacts = []
  public stringify = String
  public maxAdults = 0
  public maxChildren = 0
  public maxXtraAdults = 0
  public maxExceeded:any = {}
  public formErrors ={maxExceeded:[]}
  private rateToApply:any 
  public amountTotal = 0.00
  public differenceInDays = 0
  showManualRoomRates = false;
  roomSelectDisabled = true
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  private srcValues:string[] = []

  constructor
            (private roomsXService: RoomXService,
              private ratesService: RatesService, 
              private contactService: ContactService,
              private reservationService: ReservationService,
              private renderer: Renderer2, private router: Router){
                this.srcValues = [
                  `http://${HOST}:${PORT}/assets/js/bundlee5ca.js?ver=3.2.3`,
                  `http://${HOST}:${PORT}/assets/js/scriptse5ca.js?ver=3.2.3`,
                ]
              }

              

             
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.srcValues.forEach((src)=>{
        this.loadScript(src);
      })
    },500)
  }
  loadScript(src:string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.querySelector('#reservation-root'), script);
  }

  requiredErrors(field:any){
    try{
      if(this.reservation[field].length == 0){
        return true;
      }
      return false;
    }
    catch(err){return false}
  }

  requiredRoomsErrors(field:any){
    return false
  }

  ngOnInit(){
    this.showSpinner = true
    this.showRoomTypeSpinner = true
    this.roomsXService.getRoomTypes().pipe(take(1)).subscribe(
      (response: any) => {
        if(response.status){
          this.roomTypes = response.data
          this.showRoomTypeSpinner = false
        }
    })
    
    this.showContactTypeSpinner = true
    this.contactService.getContactsType().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.contactTypes = response.data
          this.showContactTypeSpinner = false
        }
    })

    this.showRatesSpinner = true
    this.ratesService.getRates().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.rates = response.data
          this.showRatesSpinner = false
          
        }
    })
    this.showSpinner = false

  }

  isValidInput(field){
    return this.hasNoNumbersOrSpecialChars(this.reservation[field])
  }

  hasNoNumbersOrSpecialChars(inputString) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(inputString);
  }

  isValidEmail(email) {
    var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  }

 
  onSubmit() {
    this.showSpinner = true;
    console.log(this.reservation)
    this.reservation.payment_ref = "T158244198704828" //Mock payment
    this.reservation.total_amount = this.amountTotal
    this.reservationService.makeReservation(this.reservation).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#423f3f'; // Alert yellow color
        }
        else{
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        }
        this.showAlert = true
      },
      (error: any) => {
        console.error('An error occurred in the subscription:', error);
        this.alertMessage = error
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        this.showAlert = true
      }
    );
  }

  clearRoomRelated(){
    this.reservation.no_occupants = ''
    this.rooms = []
  }

  private getObjectFromArrayById(arr:any[],id:number){
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  public getObjectFromArrayByRoomNo(arr:any[],room_no:number){
    const obj:any = arr.find(x => x.room_no === room_no);
    return obj
  }

  private getRatePerNightByIdAndRateName(roomTypeId, rateName) {
    for (const rate of this.rates) {
      if (rate.rate_name === rateName) {
        for (const roomAndRate of rate.room_and_rates) {
          if (roomAndRate.room_type.id === roomTypeId) {
            return parseFloat(roomAndRate.rate_per_night);
          }
        }
      }
    }
    return null;
  }

  recalculate(manualOveride=false){
    let amountTotal = 0.00
    const computedRates = new Array()
    const selectedRooms = this.reservation.rooms

    if(this.rateToApply && manualOveride==false){
      selectedRooms.forEach(room => {
        const roomObj = this.getObjectFromArrayByRoomNo(this.rooms,room)
        const roomTypeId = roomObj.room_type.id
        console.log(roomTypeId, this.rateToApply)
        computedRates.push(this.getRatePerNightByIdAndRateName(roomTypeId,this.rateToApply.rate_name))
      });
      console.log(this.rates)
      console.log("Computed rates ====>",computedRates)
      
      if(computedRates.includes(null)){
        this.showManualRoomRates = true;
      }
      else{
        amountTotal = this.sumArray(computedRates) * this.getDifferenceInDays()
        console.log("Total for period ","NGN", amountTotal)
      }
    }

    else{
      /* Use rates on each rooms to calculate if no rate is selected */
      selectedRooms.forEach(room => {
        const roomObj = this.getObjectFromArrayByRoomNo(this.rooms,room)
        const roomRate = roomObj.room_rate
        computedRates.push(parseFloat(roomRate))
      });

      console.log("Computed rates ====>",computedRates)
      if(computedRates.includes(null)){
        /* Manually enter rates if one or more rates is not set */
        this.showManualRoomRates = true;
      }
      else{
        amountTotal = this.sumArray(computedRates) * this.getDifferenceInDays()
        console.log("Using Overide value: Total for period ","NGN", amountTotal)
      }
    }
    this.amountTotal = amountTotal
  }

  cloneRoomRates(){
    if(this.selectedRoomsClone.length == 0){
      this.selectedRoomsClone = JSON.parse(JSON.stringify(this.reservation.rooms))
    }
  }

  applyManualRates(update=false){
    this.showManualRatesSpinner = true
    setTimeout(()=>{
      this.showManualRatesSpinner = false
    },2000)
    this.selectedRoomsClone = JSON.parse(JSON.stringify(this.reservation.rooms))
    this.reservation.rooms.forEach(room => {
      const roomObj = this.getObjectFromArrayByRoomNo(this.rooms,room)
      const roomRateInput:any = document.getElementById(`room-${room}`)
      roomObj.room_rate = parseFloat(roomRateInput.value)
    });
    this.recalculate(true)    
  }

  resetManualRates(){
    this.reservation.rooms = this.selectedRoomsClone
    this.recalculate()
  }

  calculateSelectedRate($event:any){
    let roomTypeId:any;
    const rateId = parseInt($event.target.value) 
    this.rateToApply = this.getObjectFromArrayById(this.rates,rateId)
    console.log(this.rateToApply)
    
    this.updatePill(roomTypeId)
    
    this.recalculate()
  }

  filterRoomByType($event){
    // Initialize the max Trackers
    this.maxAdults = 0
    this.maxChildren = 0
    this.maxXtraAdults = 0

    this.roomSelectDisabled = true
    this.clearRoomRelated()
    const roomType = $event.target.value
    this.showRoomSpinner = true
    this.roomsXService.getrooms(roomType).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.rooms = response.data
          this.roomSelectDisabled = false
          this.showRoomSpinner = false
        }
       
    },
    (error:any)=>{
      this.showRoomSpinner = false
    })

  }

  filterContactByType($event){
    const contactType = $event.target.value
    this.showContactSpinner = true
    this.contactChosen = true
    this.contactService.getContacts(contactType).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.contacts = response.data
          this.showContactSpinner = false
          this.contactChosen = false
        }
    },
    (error:any)=>{
      this.showContactSpinner = false
    })
  
  }

  private sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  public getDifferenceInDays($event:any=null) {
    // Parse the input date strings into Date objects
    let date2:any = new Date(this.reservation.check_out);
    let date1:any = new Date(this.reservation.check_in);
    if(this.reservation.check_in != undefined && this.reservation.check_out != undefined){
      if(date2 >= date1 ==false){
        $event.target.value = undefined
        alert("The checkout date must be the same day or a later date")
      }
      if(date1 >= date2 ==true){
        $event.target.value = undefined
        alert("The checkout date cannot be before the checkin date")
      }
      try{
        const differenceInMilliseconds = Math.abs(date2 - date1);
        const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
        this.differenceInDays = differenceInDays
        return differenceInDays;
      }
      catch(err){}
    }
    return null
    
  }

  choseRooms(){
    let roomTypeId:any;
    const selectedRooms = this.reservation.rooms
    this.roomChosen = this.reservation.rooms.length < 0
    this.maxAdults = this.calculateMaxAllowed(selectedRooms,'no_occupants')
    this.recalculate()
    this.updatePill(roomTypeId)
  }

  updatePill(roomTypeId){
    this.reservation.rooms.forEach(room => {
      const roomObj = this.getObjectFromArrayByRoomNo(this.rooms,room)
      roomTypeId = roomObj.room_type.id
      let c_rate = this.getRatePerNightByIdAndRateName(roomTypeId,this.rateToApply.rate_name)
      roomObj.room_rate = c_rate
    });
  }

  public calculateMaxAllowed(selectedRooms,type){
    const maxOccupants = []
    selectedRooms.forEach(room => {
      const roomObj = this.getObjectFromArrayByRoomNo(this.rooms,room)
      console.log(room,roomObj)
      if(roomObj[type] == null){
        if(roomObj.room_type[type] != null){
          maxOccupants.push(roomObj.room_type[type])
        }
      }
      else{
          maxOccupants.push(roomObj[type])
      }
    });
    const maxAllowedForSelectedRooms = this.sumArray(maxOccupants)
    return maxAllowedForSelectedRooms
  }

  private removeFromArray(arr,item){
    const newArr = []
    arr.forEach((el)=>{
      if(el != item){
        newArr.push(el)
      }
    })
    return newArr
  }
  
  public isMaxoccupantValid($event){
    const type = $event.target.name
    const selectedRooms = this.reservation.rooms
    const value = $event.target.value
    const maxAllowedForSelectedRooms = this.calculateMaxAllowed(selectedRooms,type)
    if(maxAllowedForSelectedRooms >= parseInt(value)){
      this.formErrors.maxExceeded = this.removeFromArray(this.formErrors.maxExceeded,type)
    }
    else{
      if (value != ''){
        this.formErrors.maxExceeded.push(type)
        this.maxExceeded.type = type
        this.maxExceeded.text = `Rooms selected can not accomodate ${type.split('_')[1]} specified \n
        The maximum selected rooms can accomodate is ${maxAllowedForSelectedRooms}`
      }
    }
  }

  public showManualRate(){
    this.showManualRoomRates = true;
  }

  public closeManualRoomRates(){
    this.showManualRoomRates = false;
  }

  public editRoomReservation(room_no:any){
    console.log(room_no)
  }



}

