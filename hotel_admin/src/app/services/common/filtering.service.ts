import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  serializeQuery(url,queryObj){
    const queries = ['?']
    Object.keys(queryObj).forEach((key)=>{
        queries.push(`${String(key) + '=' + queryObj[key]}&`)
    })
    return url+queries.join().replaceAll(',','').replaceAll(' ','_').toLocaleLowerCase()
  }

  filterRecords(url,filter:any){
    return this.http.get(`${environment.api}/${this.serializeQuery(url,filter)}`)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }
}
