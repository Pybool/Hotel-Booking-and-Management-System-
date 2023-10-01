import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceDetailsComponent } from './invoice-details.component';

@NgModule({
  declarations: [InvoiceDetailsComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class InvoiceDetailsModule {}
