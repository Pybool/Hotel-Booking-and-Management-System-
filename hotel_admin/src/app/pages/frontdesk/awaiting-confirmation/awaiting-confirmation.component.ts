import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-awaiting-confirmation',
  templateUrl: './awaiting-confirmation.component.html',
  styleUrls: ['./awaiting-confirmation.component.css']
})
export class AwaitingConfirmationComponent {
  reservations = []
  showSpinner = false;
  editSalaryTopUp = false
  showingArchive:boolean = false
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  constructor(private reservationService: ReservationService){}

  ngOnInit(){
    this.showSpinner = true;
   
    this.reservationService.getReservations().pipe(take(1)).subscribe((response:any)=>{
        console.log(response);

        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.reservations = response.data
          // this.paginationService.setLinks(response.next,response.last,'staff-list','',this.is_search)
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
    // this.paginateSubscription()
  }

}
