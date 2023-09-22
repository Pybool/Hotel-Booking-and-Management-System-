import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/common/auth.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-create-departments',
  templateUrl: './create-departments.component.html',
  styleUrls: ['./create-departments.component.css']
})
export class CreateDepartmentsComponent {
  public department:any = {}
  public directorOptions = []
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private authService:AuthService, private hotelService: HotelService){}

  ngOnInit(){
    this.authService.getStaff(true).pipe(take(1)).subscribe(
      (response:any)=>{
      if(response.status){
        this.directorOptions = response.data
      }
    },
    (error:any)=>{
      alert(error)
    })
  }
  onSubmit(){
    console.log(this.department)
    this.hotelService.createDepartment(this.department).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
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
        // Handle the error here, if needed
      }
    );
  }
}
