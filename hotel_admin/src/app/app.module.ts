import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwaitingConfirmationComponent } from './pages/frontdesk/awaiting-confirmation/awaiting-confirmation.component';
import { NoshowsComponent } from './pages/frontdesk/noshows/noshows.component';
import { CheckInComponent } from './pages/frontdesk/check-in/check-in.component';
import { CheckInHistoryComponent } from './pages/frontdesk/check-in-history/check-in-history.component';
import { NoRecordComponent } from './pages/frontdesk/no-record/no-record.component';
import { TodayComponent } from './pages/progress/today/today.component';
import { MonthlyComponent } from './pages/progress/monthly/monthly.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/common/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.inteceptor';
import { FooterComponent } from './common/footer/footer.component';
import { PaginationService } from './services/common/pagination.service';
import { SalaryAllowanceService } from './services/finance/salary-allowance.service';
import { HotelService } from './services/hotel/hotel.service';
import { AmenitiesService } from './services/rooms/amenities.service';
import { RoomXService } from './services/rooms/room-x.service';
import { ClosedComplaintsComponent } from './pages/requesthandling/closed-complaints/closed-complaints.component';
import { RoomShiftComponent } from './pages/requesthandling/room-shift/room-shift.component';

@NgModule({
  declarations: [
    AppComponent,
    AwaitingConfirmationComponent,
    NoshowsComponent,
    CheckInComponent,
    CheckInHistoryComponent,
    NoRecordComponent,
    TodayComponent,
    MonthlyComponent,
    LoginComponent,
    FooterComponent,
    ClosedComplaintsComponent,
    RoomShiftComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,PaginationService,SalaryAllowanceService,HotelService,AmenitiesService,RoomXService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
