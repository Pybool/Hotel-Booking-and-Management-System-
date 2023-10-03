import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.retrieveToken()) {
        // Also check token has not expired
      return true;
    } else {
      // User doesn't have a valid token, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
