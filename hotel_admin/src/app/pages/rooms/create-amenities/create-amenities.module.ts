import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateAmenitiesComponent } from './create-amenities.component';

@NgModule({
  declarations: [CreateAmenitiesComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class CreateAmenitiesModule {}
