import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UiconfigService {

  constructor(private http: HttpClient,private router:Router) { }

  createFeatures(features:any){
    this.http.post(`${environment.api}/uiconfig-features`, features).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
}
