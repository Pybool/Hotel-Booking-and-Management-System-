import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UiconfigService {

  constructor(private http: HttpClient) { }

  createFeatures(features:any){
    this.http.post(`${environment.api}/uiconfig-features`, features).subscribe(
      (response:any) => {
        alert(response.message)
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

  createServices(services:any){
    this.http.post(`${environment.api}/uiconfig-services`, services).subscribe(
      (response:any) => {
        alert(response.message)
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
}
