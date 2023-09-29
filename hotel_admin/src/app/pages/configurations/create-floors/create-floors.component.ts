import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-create-floors',
  templateUrl: './create-floors.component.html',
  styleUrls: ['./create-floors.component.css']
})
export class CreateFloorsComponent {
  public floor:any = {}
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000;
  alertBackgroundColor: string = '#ffc107';

  constructor(private hotelService: HotelService){}

  ngOnInit(){}
  onSubmit(){
    this.showSpinner = true;
    this.hotelService.createFloors(this.floor).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
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
