import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationComponent } from './reservation.component';

@NgModule({
  declarations: [ReservationComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class ReservationModule {}
