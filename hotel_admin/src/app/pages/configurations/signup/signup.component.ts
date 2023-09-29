import { Component } from '@angular/core';
import {NewUser} from '../model'
import { IUser } from '../../../interfaces/signup.interface';
import { AuthService } from 'src/app/services/common/auth.service';
import { catchError, take } from 'rxjs';
import { SalaryAllowanceService } from 'src/app/services/finance/salary-allowance.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  public user:any = NewUser
  public showSpinner:Boolean = false;
  departments = []
  salaries:any[] = []
  staffRoles:any[] = []
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private hotelService : HotelService,private authService: AuthService, private salaryAllowanceService:SalaryAllowanceService){
    this.hotelService.getDepartments({}).pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.departments = response.data
      }
    })
  }

  ngOnInit(){
    this.authService.getStaffRoles().pipe(take(1)).subscribe((response:any)=>{
      if(response.status){
        this.staffRoles = response.data
      }
    })

    this.salaryAllowanceService.getSalaries().pipe(take(1)).subscribe((response:any)=>{
      if(response.status){
        this.salaries = response.data
        console.log(this.salaries)
      }
    })
  }

  validateRequired(value:string) {
    return value.trim() !== '';
  }
  
  validateEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private getObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  onSubmit() {
    this.showSpinner = true;
    this.authService.createStaff(this.user).pipe(
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

  selectStaffRole($event:any){
    const roleId = parseInt($event.target.value)
    console.log("role id ", roleId)
    const roleObj = this.getObjectFromArray(this.staffRoles,roleId)
    console.log("role obj ", roleObj)
    const staffSalary = this.getObjectFromArray(this.salaries,roleObj.salary_id)
    console.log("staff salary ", staffSalary)
    this.user.basic_salary = ''+staffSalary.id
  }

  formatNumber(value: number): string {
    return value.toLocaleString(); // This formats the number with a thousand separator
  }
}
