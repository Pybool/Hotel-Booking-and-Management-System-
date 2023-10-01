import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  rawInvoices = []
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  
  constructor(private hotelService : HotelService,private router: Router){}

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
          this.rawInvoices = response.data

          this.aggregateServiceBills(response.data)
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

  aggregateServiceBills(serviceBills){
    const reducedInvoices = serviceBills.reduce((acc,invoice)=>{
      const {active_reservation_token,dead_reservation_token, bill_date, grand_total} = invoice

      if (acc[active_reservation_token] || acc[dead_reservation_token]){
        console.log(grand_total)
        let previous = parseFloat(acc[active_reservation_token].grand_total)
        let current = previous += parseFloat(grand_total)
        acc[active_reservation_token].grand_total = current
      }
      else{
        acc[active_reservation_token] = {active_reservation_token, bill_date, grand_total}
      }

      return acc;
    },{})

    const result = Object.values(reducedInvoices)
    console.log(result)
    this.serviceBills =  result
  }

  getObjectByBookingID(bookingID){
    const obj:any = this.serviceBills.find(x => x.active_reservation_token === bookingID);
    return obj
  }

  viewInvoiceDetails(bookingId:string){
    window.localStorage.setItem('invoice',JSON.stringify(this.getObjectByBookingID(bookingId)))
    const queryParams = {bookingId:bookingId}
    this.router.navigate(['/root/service-usage/invoice-details'],{queryParams:queryParams})
  }
}
