import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  public invoice;
  public sponsor;
  public showSpinner = false
  public invoices:any = []
  public serviceBills:any = []
  public bookingID:string;
  public currentdate:string = String(new Date())
  constructor(private route: ActivatedRoute,private hotelService: HotelService, private reservationService: ReservationService){}

  ngOnInit(){
    this.route.queryParams.pipe(take(1)).subscribe((params)=>{
      const bookingId = params['bookingId'];
      this.invoice = JSON.parse(window.localStorage.getItem('invoice'))
      this.bookingID = bookingId
      this.invoice.created_at = this.friendlyDateFormat(this.invoice.bill_date)
      this.getReservationServiceBills(this.bookingID)
      this.reservationService.getSponsor(this.bookingID).pipe(take(1))
      .subscribe((response:any)=>{
        this.sponsor = response.data
      })
    })
  }

  getObjectByBookingID(bookingID){
    const obj:any = this.invoices.find(x => x.active_reservation_token === bookingID);
    return obj
  }

  private friendlyDateFormat(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date"; 
    }
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const day = inputDate.getUTCDate();
    const month = monthNames[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();
    const hours = inputDate.getUTCHours();
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedDate = `${day} ${month}, ${year} ${formattedHours}:${minutes} ${ampm}`;
  
    return formattedDate;
  }

  getReservationServiceBills(reservation_token:string){
    this.showSpinner = true
    this.hotelService.getServiceBills('',reservation_token).pipe(
      take(1)
    ).subscribe((response:any)=>{
      this.showSpinner = false
      if(response.status){
        this.serviceBills = response.data
      }
    },
    (error)=>{

    })
  }

}
