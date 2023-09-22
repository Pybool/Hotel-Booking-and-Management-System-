import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomXService {

  constructor(private http: HttpClient) { }

  createBedtype(amenity:any){
    return this.http.post(`${environment.api}/hotel-bedtype`,amenity)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getBedtype(){
    return this.http.get(`${environment.api}/hotel-bedtype`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  createRoomtype(roomType:any){
    return this.http.post(`${environment.api}/hotel-roomtype`,roomType)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getRoomTypes(){
    return this.http.get(`${environment.api}/hotel-roomtype`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  createroom(room:any){
    return this.http.post(`${environment.api}/hotel-room`,room)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  raiseComplaint(complaint:any){
    return this.http.post(`${environment.api}/rooms-complaint`,complaint)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getRaisedComplaints(){
    return this.http.get(`${environment.api}/rooms-complaint`)
    .pipe(
      timeout(20000), 
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getrooms(query:any=''){
    return this.http.get(`${environment.api}/hotel-room?query=${query}`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }


  getRecentCheckedOutRooms(query:any=''){
    return this.http.get(`${environment.api}/rooms-recent-checked-out?query=${query}`)
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }

  markRoomAsReady(roomId){
    return this.http.patch(`${environment.api}/rooms-recent-checked-out?id=${roomId}`,{id:roomId})
    .pipe(
      timeout(20000),
      catchError((error) => {
        return throwError('An error occurred while making the request.');
      })
    );
  }


  nextPage(link:number,cmp:string,query:string){
    return this.http.get<any>(`${environment.api}/hotel-room?limit=${environment.paginationLimit}&offset=${(link)}`+query) 
      .pipe(
        timeout(20000), // Timeout after 30 seconds
        catchError((error) => {
          // Handle errors here
          return throwError('An error occurred while making the request.');
      })
    );
  }

}
