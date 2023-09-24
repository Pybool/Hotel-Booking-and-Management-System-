import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UiconfigService {

  constructor(private http: HttpClient) { }

  createFeatures(features:any){
    return this.http.post(`${environment.api}/uiconfig-features`, features)
  }

  getFeatures(){
   return this.http.get(`${environment.api}/uiconfig-features`)
  }

  createServices(services:any){
    return this.http.post(`${environment.api}/uiconfig-services`, services)
  }

  getServices(){
    return this.http.get(`${environment.api}/uiconfig-services`)
   }
}
