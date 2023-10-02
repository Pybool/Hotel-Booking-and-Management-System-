import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceListComponent } from './service-bills.component';

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class ServiceBillsModule {}
