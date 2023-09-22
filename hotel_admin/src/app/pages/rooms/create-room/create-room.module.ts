import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoomComponent } from './create-room.component';

@NgModule({
  declarations: [CreateRoomComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule],
  
})
export class CreateRoomModule {}
