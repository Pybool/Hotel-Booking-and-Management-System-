import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  getRates(){
    return this.http.get(`${environment.api}/finance-room-rates`)
    .pipe(
      timeout(20000), // Timeout after 20 seconds
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }
}

