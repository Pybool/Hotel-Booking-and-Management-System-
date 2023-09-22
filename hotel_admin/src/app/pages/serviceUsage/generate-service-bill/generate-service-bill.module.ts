import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenerateServiceBillComponent } from './generate-service-bill.component';

@NgModule({
  declarations: [GenerateServiceBillComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class GenerateServiceBillModule {}
