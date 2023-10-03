import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials:{email:string,password:string}= {email:'',password:''}

  constructor(private authService: AuthService){

  }

  ngOnInit(){

  }

  onSubmit(){
    console.log(this.credentials)
    this.authService.login(this.credentials).pipe(take(1))
    .subscribe((response:any)=>{
      if(response.status){
        this.authService.storeToken(response.token)
        this.authService.navigateToUrl('/root/frontdesk/dashboard')
      }
      else{
        alert(response.message)
      }

    },
    (error)=>{

    })
  }

}
