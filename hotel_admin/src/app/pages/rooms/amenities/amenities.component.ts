import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AmenitiesService } from 'src/app/services/rooms/amenities.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent {

  public amenities:any[] = []
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';

  constructor(private amenitiesService: AmenitiesService){}

  ngOnInit(){
    this.showSpinner = true;
    this.amenitiesService.getAmenities().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.amenities = response.data
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
        this.showSpinner = false;
        this.alertDuration = 3000;
        this.alertBackgroundColor = 'rgb(225 31 64)';
        this.showAlert = true
      }
    );
  }

}
