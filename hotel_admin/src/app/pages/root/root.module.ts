import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { ReservationComponent } from '../frontdesk/reservation/reservation.component';
import { AwaitingConfirmationComponent } from '../frontdesk/awaiting-confirmation/awaiting-confirmation.component';
import { UpcomingCheckInsComponent } from '../frontdesk/upcoming-check-ins/upcoming-check-ins.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../configurations/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupModule } from '../configurations/signup/signup.module';
import { AuthService } from 'src/app/services/common/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.inteceptor';
import { StaffListComponent } from '../configurations/staff-list/staff-list.component';
import { EditStaffModule } from '../configurations/edit-staff/edit-staff.module';
import { EditStaffComponent } from '../configurations/edit-staff/edit-staff.component';
import { StaffListModule } from '../configurations/staff-list/staff-list.module';
import { SalaryAllowanceService } from 'src/app/services/finance/salary-allowance.service';
import { DepartmentsModule } from '../configurations/departments/departments.module';
import { DepartmentsComponent } from '../configurations/departments/departments.component';
import { CreateDepartmentsComponent } from '../configurations/create-departments/create-departments.component';
import { CreateDepartmentsModule } from '../configurations/create-departments/create-departments.module';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { AmenitiesService } from 'src/app/services/rooms/amenities.service';
import { AmenitiesModule } from '../rooms/amenities/amenities.module';
import { AmenitiesComponent } from '../rooms/amenities/amenities.component';
import { CreateAmenitiesModule } from '../rooms/create-amenities/create-amenities.module';
import { CreateAmenitiesComponent } from '../rooms/create-amenities/create-amenities.component';
import { FloorsComponent } from '../configurations/floors/floors.component';
import { CreateFloorsComponent } from '../configurations/create-floors/create-floors.component';
import { FloorsModule } from '../configurations/floors/floors.module';
import { CreateFloorsModule } from '../configurations/create-floors/create-floors.module';
import { CreateBedtypeComponent } from '../rooms/create-bedtype/create-bedtype.component';
import { CreateBedTypeModule } from '../rooms/create-bedtype/create-bedtype.module';
import { BedTypesModule } from '../rooms/bed-types/bed-types.module';
import { BedTypesComponent } from '../rooms/bed-types/bed-types.component';
import { RoomXService } from 'src/app/services/rooms/room-x.service';
import { CreateRoomTypesComponent } from '../rooms/create-room-types/create-room-types.component';
import { CreateRoomTypeModule } from '../rooms/create-room-types/create-room-types.module';
import { RoomTypesModule } from '../rooms/room-types/room-types.module';
import { RoomTypesComponent } from '../rooms/room-types/room-types.component';
import { CreateRoomModule } from '../rooms/create-room/create-room.module';
import { CreateRoomComponent } from '../rooms/create-room/create-room.component';
import { RoomsModule } from '../rooms/rooms/rooms.module';
import { RoomsComponent } from '../rooms/rooms/rooms.component';
import { ReservationModule } from '../frontdesk/reservation/reservation.module';
import { ContactService } from 'src/app/services/contacts/contact.service';
import { RatesService } from 'src/app/services/finance/rates.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { UpcomingCheckinsModule } from '../frontdesk/upcoming-check-ins/upcoming-checkins.module';
import { ActiveCheckinsModule } from '../frontdesk/active-check-ins/active-check-ins.module';
import { ActiveCheckInsComponent } from '../frontdesk/active-check-ins/active-check-ins.component';
import { ServicesModule } from '../configurations/services/services.module';
import { ServicesComponent } from '../configurations/services/services.component';
import { GenerateServiceBillModule } from '../serviceUsage/generate-service-bill/generate-service-bill.module';
import { GenerateInvoiceComponent } from '../serviceUsage/generate-service-bill/generate-service-bill.component';
import { ServiceBillsModule } from '../serviceUsage/service-bills/service-bills.module';
import { InvoiceListComponent } from '../serviceUsage/service-bills/service-bills.component';
import { RaisedComplaintsComponent } from '../requesthandling/raised-complaints/raised-complaints.component';
import { RaisedComplainstsModule } from '../requesthandling/raised-complaints/raised-complaints.module';
import { RecentCheckoutModule } from '../rooms/recent-checkout/recent-checkout.module';
import { RecentCheckoutComponent } from '../rooms/recent-checkout/recent-checkout.component';
import { AddonsModule } from '../configurations/addons/addons.module';
import { AddonsComponent } from '../configurations/addons/addons.component';
import { UIconfigModule } from '../configurations/uiconfig/uiconfig.module';
import { UiconfigComponent } from '../configurations/uiconfig/uiconfig.component';
import { UiconfigService } from 'src/app/services/configurations/uiconfig.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AllReservationsModule } from '../frontdesk/all-reservations/all-reservations.module';
import { AllReservationsComponent } from '../frontdesk/all-reservations/all-reservations.component';
import { RecordService } from 'src/app/services/common/filtering.service';
import { InvoiceDetailsModule } from '../serviceUsage/invoice-details/invoice-details.module';
import { InvoiceDetailsComponent } from '../serviceUsage/invoice-details/invoice-details.component';
// import { FeatureCardModule } from '../configurations/featurecard/featurecard.module';

const routes: Routes = [{
                          path: 'frontdesk',
                          component: RootComponent,
                          children: [
                              { path: 'all-reservation', component: AllReservationsComponent },
                              { path: 'reservation', component: ReservationComponent },
                              { path: 'awaiting-confirmation', component: AwaitingConfirmationComponent },
                              { path: 'upcoming-checkins', component: UpcomingCheckInsComponent },
                              { path: 'active-checkins', component: ActiveCheckInsComponent },
                              { path: 'dashboard', component: DashboardComponent },
                          ],
                        },
                        {
                          path: 'service-usage', 
                          component: RootComponent,
                          children: [
                              { path: 'create-invoice', component: GenerateInvoiceComponent },
                              { path: 'invoice-list', component: InvoiceListComponent },
                              { path: 'invoice-details', component: InvoiceDetailsComponent },
                          ],
                        },
                       
                        {
                          path: 'request-handling', 
                          component: RootComponent,
                          children: [
                              { path: 'raised-complaints', component: RaisedComplaintsComponent },
                          ],
                        },
                        {
                          path: 'configurations',
                          component: RootComponent,
                          children: [
                              { path: 'create-staff', component: SignupComponent },
                              { path: 'edit-staff', component: EditStaffComponent },
                              { path: 'staff-list', component: StaffListComponent },
                              { path: 'hotel-departments', component: DepartmentsComponent },
                              { path: 'hotel-floors', component: FloorsComponent },
                              { path: 'hotel-create-floors', component: CreateFloorsComponent },
                              { path: 'create-hotel-departments', component: CreateDepartmentsComponent },
                              { path: 'hotel-services', component: ServicesComponent },
                              { path: 'reservation-addons', component: AddonsComponent },
                              { path: 'client-ui-config', component: UiconfigComponent },
                          ],
                        },
                        {
                          path: 'rooms',
                          component: RootComponent,
                          children: [
                              { path: 'amenities', component: AmenitiesComponent },
                              { path: 'create-amenities', component: CreateAmenitiesComponent },
                              { path: 'create-bedtype', component: CreateBedtypeComponent },
                              { path: 'bedtypes', component: BedTypesComponent },
                              { path: 'create-roomtype', component: CreateRoomTypesComponent },
                              { path: 'roomtypes', component: RoomTypesComponent },
                              { path: 'create-room', component: CreateRoomComponent },
                              { path: 'rooms-list', component: RoomsComponent },
                              { path: 'rooms-recent-checkout', component: RecentCheckoutComponent },
                              
                          ],
                        }
                        ]

@NgModule({
  declarations: [ RootComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SignupModule,
    StaffListModule,
    EditStaffModule,
    DepartmentsModule,
    CreateDepartmentsModule,
    AmenitiesModule,
    CreateAmenitiesModule,
    FloorsModule,
    CreateFloorsModule,
    CreateBedTypeModule,
    BedTypesModule,
    CreateRoomTypeModule,
    RoomTypesModule,
    CreateRoomModule,
    RoomsModule,
    ReservationModule,
    UpcomingCheckinsModule,
    ActiveCheckinsModule,
    ServicesModule,
    GenerateServiceBillModule,
    ServiceBillsModule,
    RaisedComplainstsModule,
    RecentCheckoutModule,
    AddonsModule,
    UIconfigModule,
    DashboardModule,
    AllReservationsModule,
    InvoiceDetailsModule,
    // FeatureCardModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService,
              SalaryAllowanceService,
              HotelService,
              AmenitiesService,
              RoomXService,
              ContactService,
              RatesService,
              ReservationService,
              UiconfigService,
              RecordService,


  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
})
export class RootModule { }


