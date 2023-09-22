import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  public services = []
  showCreateService = false;
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';
  public service:any = {}

  constructor(private hotelService: HotelService){}

  toggleCreateServiceModal(){
    this.showCreateService = !this.showCreateService;
  }

  ngOnInit(){
    this.showSpinner = true;
    this.hotelService.getServices().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.services = response.data
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

  onSubmit(){
    this.showSpinner = true;
    console.log(this.service)
    this.hotelService.createService(this.service).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.services.push(this.service)
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
