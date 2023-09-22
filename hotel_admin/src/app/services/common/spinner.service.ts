import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  tokenKey:string = 'token'
  userKey:string = 'user'
  showSpinner:boolean = true;
  showSpinner$:any = new BehaviorSubject(false)
  constructor() { }


  setSpinner(status:boolean){
    this.showSpinner = status
    this.showSpinner$.next(this.showSpinner)
  }

  getSpinner(){
    return this.showSpinner$.asObservable()
  }

  
}