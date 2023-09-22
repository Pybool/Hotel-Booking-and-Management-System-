import { Component } from '@angular/core';
import { take } from 'rxjs';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-create-bedtype',
  templateUrl: './create-bedtype.component.html',
  styleUrls: ['./create-bedtype.component.css']
})
export class CreateBedtypeComponent {
  public bedtype:any = {}
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000;
  alertBackgroundColor: string = '#ffc107';

  constructor(private roomsXService: RoomXService){}

  ngOnInit(){

  }

  onSubmit(){
    this.showSpinner = true;
    this.roomsXService.createBedtype(this.bedtype).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
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
      }
    );
  }

}
