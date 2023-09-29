import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent {

  public floors:any[] = []
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';

  constructor(private hotelService: HotelService){}

  ngOnInit(){
    this.showSpinner = true;
    this.hotelService.getFloors().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.floors = response.data
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
        this.showSpinner = false;
        this.alertDuration = 3000;
        this.alertBackgroundColor = 'rgb(225 31 64)';
        this.showAlert = true
      }
    );
  }



}
