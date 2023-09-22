import { Component } from '@angular/core';
import {UpdateUser} from '../model'
import { IUser } from '../../../interfaces/signup.interface';
import { AuthService } from 'src/app/services/common/auth.service';
import { catchError, take } from 'rxjs';
import { SalaryAllowanceService } from 'src/app/services/finance/salary-allowance.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent {
  
  public showSpinner:Boolean = false;
  public loadedStaff = UpdateUser;
  departments = []
  salaries:any[] = []
  staffRoles:any[] = []
  staffSalary:any
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private hotelService : HotelService,private authService: AuthService, private salaryAllowanceService: SalaryAllowanceService){
    this.hotelService.getDepartments({}).pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.departments = response.data
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
  
  ngOnInit(){
    this.loadedStaff = this.getStaff()
    if(this.loadedStaff.role == null){
      this.loadedStaff.role = {id:'',role_name:'',salary:''}
      this.loadedStaff.basic_salary = {id:'',salary_amount:''}
    }
    console.log(this.loadedStaff)
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

  getStaff(){
    return JSON.parse(window.localStorage.getItem('staff') || '{}')
  }

  private getObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  storeStaff(){
    window.localStorage.setItem('staff', JSON.stringify(this.loadedStaff))
  }

  onSubmit() {
    this.showSpinner = true;
    this.authService.updateStaff(this.loadedStaff).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
          this.storeStaff()
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
    const roleObj = this.getObjectFromArray(this.staffRoles,roleId)
    const staffSalary = this.getObjectFromArray(this.salaries,roleObj.salary_id)
    this.loadedStaff.basic_salary.id = staffSalary.id
  }

  getSalary(){
    const staffSalary = this.getObjectFromArray(this.salaries,parseInt(this.loadedStaff.basic_salary.salary_amount) || 0.00)
    this.loadedStaff.basic_salary.salary_amount = ''+staffSalary.id
  }

  ngAfterViewInit(){

  }

  // loadedStaff.basic_salary

  formatNumber(value: number): string {
    return value.toLocaleString(); // This formats the number with a thousand separator
  }
}
