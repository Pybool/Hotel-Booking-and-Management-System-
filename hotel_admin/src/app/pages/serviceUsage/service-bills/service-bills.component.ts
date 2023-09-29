import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-service-bills',
  templateUrl: './service-bills.component.html',
  styleUrls: ['./service-bills.component.css']
})
export class ServiceBillsComponent {
  public showSpinner:Boolean = false;
  public serviceBills = []
  loadedServiceBill:any = {}
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  
  constructor(private hotelService : HotelService){}

  ngOnInit(){
    this.showSpinner = true;
    this.hotelService.getServiceBills().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.serviceBills = response.data
          this.alertDuration = 3000;
          this.alertBackgroundColor = '#423f3f';
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
