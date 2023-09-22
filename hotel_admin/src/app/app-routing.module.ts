import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { ReservationComponent } from './pages/frontdesk/reservation/reservation.component';
import { LoginComponent } from './pages/auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'root',
    loadChildren: () =>
      import('./pages/root/root.module').then((m) => m.RootModule),  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
