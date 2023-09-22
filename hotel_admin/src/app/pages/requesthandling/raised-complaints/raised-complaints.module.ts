import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RaisedComplaintsComponent } from './raised-complaints.component';

@NgModule({
  declarations: [RaisedComplaintsComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class RaisedComplainstsModule {}
