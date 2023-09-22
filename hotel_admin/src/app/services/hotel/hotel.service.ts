import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  createDepartment(department:any){
    return this.http.post(`${environment.api}/hotel-departments`,department)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getDepartments(department:any){
    return this.http.get(`${environment.api}/hotel-departments`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  createFloors(floor:any){
    return this.http.post(`${environment.api}/hotel-floors`,floor)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getFloors(){
    return this.http.get(`${environment.api}/hotel-floors`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  createService(service:any){
    return this.http.post(`${environment.api}/hotel-services`,service)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getServices(){
    return this.http.get(`${environment.api}/hotel-services`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  createServiceBill(bill:any){
    return this.http.post(`${environment.api}/hotel-bills`,bill)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getServiceBills(room:string='',reservation_token:string=''){
    return this.http.get(`${environment.api}/hotel-bills?room=${room}&reservation_token=${reservation_token}`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
