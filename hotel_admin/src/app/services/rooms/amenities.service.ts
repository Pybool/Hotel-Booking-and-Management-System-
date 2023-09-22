import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor(private http: HttpClient) { }

  createAmenity(amenity:any){
    return this.http.post(`${environment.api}/rooms-amenities`,amenity)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getAmenities(){
    return this.http.get(`${environment.api}/rooms-amenities`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
