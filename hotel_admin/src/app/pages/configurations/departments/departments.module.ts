import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentsComponent } from './departments.component';

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class DepartmentsModule {}
