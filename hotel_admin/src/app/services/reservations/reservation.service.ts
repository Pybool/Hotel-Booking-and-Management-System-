import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  makeReservation(reservation:any){
    return this.http.post(`${environment.api}/reservation`,reservation)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getReservations(active:string=''){
    let url;
    if (active=='active-check-in'){
      url = `${environment.api}/reservation?active=1`
    }
    else{
      url = `${environment.api}/reservation`
    }
    return this.http.get(url)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  checkIn(data={},checkOut=null){
    let url = `${environment.api}/reservation`
    if (checkOut == 'Checkout'){
      url = `${environment.api}/reservation?checkout=1`
    }
    return this.http.patch(url,data)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  nextPage(link:number,cmp:string,query:string){
    return this.http.get<any>(`${environment.api}/reservation?limit=${environment.paginationLimit}&offset=${(link)}`+query) 
      .pipe(
        timeout(20000), // Timeout after 30 seconds
        catchError((error) => {
          // Handle errors here
          return throwError('An error occurred while making the request.');
      })
    );
  }

  newAddon(addon:any){
    return this.http.post(`${environment.api}/reservation-addons`,addon)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getAddons(){
    return this.http.get(`${environment.api}/reservation-addons`)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
