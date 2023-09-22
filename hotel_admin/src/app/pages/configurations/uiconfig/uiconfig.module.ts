import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UiconfigComponent } from './uiconfig.component';
import { FeatureCardModule } from '../featurecard/featurecard.module';

@NgModule({
  declarations: [UiconfigComponent],
  imports: [CommonModule, FormsModule,HttpClientModule, SharedModule,FeatureCardModule],
  
})
export class UIconfigModule {}
