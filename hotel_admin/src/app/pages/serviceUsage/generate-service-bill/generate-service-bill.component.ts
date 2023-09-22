import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ContactService } from 'src/app/services/contacts/contact.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-generate-service-bill',
  templateUrl: './generate-service-bill.component.html',
  styleUrls: ['./generate-service-bill.component.css']
})
export class GenerateServiceBillComponent {
  public serviceBill:any = {}
  public showSpinner:Boolean = false;
  public services = []
  public rooms = []
  public contacts = []
  loadedService:any = {}
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private hotelService : HotelService,private roomsXService: RoomXService,private contactService: ContactService){
    this.hotelService.getServices().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.services = response.data
      }
    })

    this.roomsXService.getrooms('checkedIn').pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.rooms = response.data
        }
       
    })

    this.contactService.getContacts().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        if(response.status){
          this.contacts = response.data
        }
    })
  }

  ngOnInit(){
    
  }

  private getObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  loadService($event){
    const serviceId = $event.target.value
    this.loadedService = this.getObjectFromArray(this.services,parseInt(serviceId))
  }

  onSubmit(){
    this.serviceBill.rate = this.serviceBill.rate || this.loadedService.rate
    console.log(this.serviceBill)

    this.hotelService.createServiceBill(this.serviceBill).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.services.push(this.serviceBill)
          this.alertDuration = 3000;
          this.alertBackgroundColor = '#1aa51a';
        }
        else{
          this.alertDuration = 3000;
          this.alertBackgroundColor = 'rgb(225 31 64)';
        }
        this.showAlert = true
      },
      (error: any) => {
        console.error('An error occurred in the subscription:', error);
        this.showSpinner = false;
        this.alertDuration = 3000;
        this.alertBackgroundColor = 'rgb(225 31 64)';
        this.showAlert = true
      }
    );
  }
}
