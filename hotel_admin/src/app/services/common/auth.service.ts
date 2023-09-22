import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey:string = 'token'
  userKey:string = 'user'
  loggedIn:boolean = false;
  loggedIn$:any = new BehaviorSubject(false)
  vendorSubscription:boolean = false
  vendorSubscription$:any = new BehaviorSubject(false)
  constructor(private http: HttpClient,private router:Router) { }


  setLoggedIn(status:boolean){
    this.loggedIn = status
    this.loggedIn$.next(this.loggedIn)
  }

  getAuthStatus(){
    return this.loggedIn$.asObservable()
  }

  login(credentials: any) {
    return this.http.post(`${environment.api}/login`, credentials);
  }

  createStaff(staff: any) {
    console.log(staff)
    return this.http.post(`${environment.api}/manage-staff`, staff)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  updateStaff(staff: any) {
    console.log(staff)
    return this.http.put(`${environment.api}/manage-staff`, staff)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getStaff(filter: any) {
    return this.http.get(`${environment.api}/manage-staff?all=${filter}`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getStaffRoles() {
    return this.http.get(`${environment.api}/staff-roles`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  addCommentary(commentary: any) {
    return this.http.put(`${environment.api}/staff-commentary`,commentary)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getStaffCommentary(uid:any){
    return this.http.get(`${environment.api}/staff-commentary?uid=${uid}`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  archiveStaff(uid:any,reverse:boolean){
    return this.http.patch(`${environment.api}/staff-by-property?uid=${uid}&reverse=${reverse}`,{archive:reverse})
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  getStaffByProperty(property){
    return this.http.get(`${environment.api}/staff-by-property?property=${property}`)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  patchStaff(patch){
    return this.http.patch(`${environment.api}/manage-staff`,patch)
    .pipe(
      timeout(20000), // Timeout after 30 seconds
      catchError((error) => {
        // Handle errors here
        return throwError('An error occurred while making the request.');
      })
    );
  }

  nextPage(link:number,cmp:string,query:string){
    if(cmp == 'seller-orders'){
      console.log(query)
      return this.http.get<any>(`${environment.api}/merchant-orders?limit=${environment.paginationLimit}&offset=${(link)}`+query) 
    }
    else{
      return this.http.get<any>(`${environment.api}/manage-staff?limit=${environment.paginationLimit}&offset=${(link)}`+query) 
      .pipe(
        timeout(20000), // Timeout after 30 seconds
        catchError((error) => {
          // Handle errors here
          return throwError('An error occurred while making the request.');
        })
      );
    }
  }





  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  retrieveToken() {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  storeUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  retrieveUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  removeUser() {
    localStorage.removeItem(this.userKey);
  }

  refresh(){
    return of([])
  }

  navigateToUrl(url:string){
    this.router.navigateByUrl(url)
  }
}