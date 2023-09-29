import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AmenitiesService } from 'src/app/services/rooms/amenities.service';

@Component({
  selector: 'app-create-amenities',
  templateUrl: './create-amenities.component.html',
  styleUrls: ['./create-amenities.component.css']
})
export class CreateAmenitiesComponent {

  public amenity:any = {}
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private amenitiesService: AmenitiesService){}

  ngOnInit(){

  }
  onSubmit(){
    this.showSpinner = true;
    this.amenitiesService.createAmenity(this.amenity).pipe(
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
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        this.showAlert = true
        // Handle the error here, if needed
      }
    );
  }

}
