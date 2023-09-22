import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditStaffComponent } from './edit-staff.component';

@NgModule({
  declarations: [EditStaffComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class EditStaffModule {}
