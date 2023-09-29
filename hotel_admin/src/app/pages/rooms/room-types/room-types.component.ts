import { Component } from '@angular/core';
import { take } from 'rxjs';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent {
  public roomtypes:any[] = []
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';

  constructor(private roomsXService: RoomXService){}

  ngOnInit(){
    this.showSpinner = true;
    this.roomsXService.getRoomTypes().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.roomtypes = response.data
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
