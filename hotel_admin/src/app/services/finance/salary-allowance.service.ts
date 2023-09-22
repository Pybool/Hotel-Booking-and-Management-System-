import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SalaryAllowanceService {

  constructor(private http: HttpClient) { }

  getSalaries(){
    return this.http.get(`${environment.api}/finance-staff-salary`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
