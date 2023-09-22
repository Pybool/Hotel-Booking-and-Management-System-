import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactsType(){
    return this.http.get(`${environment.api}/contacts-type`)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getContacts(query:any=''){
    return this.http.get(`${environment.api}/contacts-guest?query=${query}`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
