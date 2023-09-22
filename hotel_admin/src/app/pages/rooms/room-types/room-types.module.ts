import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RoomTypesComponent } from './room-types.component';

@NgModule({
  declarations: [RoomTypesComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
})

export class RoomTypesModule {}

