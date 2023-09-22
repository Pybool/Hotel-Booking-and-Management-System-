import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent {
  public addon:any = {}
  public addons:any = []
  public newReservationAddons:boolean = false;
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  public showSpinner:boolean = false;

  constructor(private reservationService:ReservationService){}

  ngOnInit(){
    this.reservationService.getAddons().pipe(take(1)).subscribe((response:any)=>{
      this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.addons = response.data
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
      })
  }

  onSubmit(){
    this.showSpinner = true
    this.reservationService.newAddon(this.addon).pipe(take(1)).subscribe((response:any)=>{
      this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.addons.push(this.addon)
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
      })
  }

  toggleNewReservationAddons(){
    this.newReservationAddons = !this.newReservationAddons
  }

}
