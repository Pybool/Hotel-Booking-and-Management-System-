import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StaffListComponent } from './staff-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [StaffListComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class StaffListModule {}
