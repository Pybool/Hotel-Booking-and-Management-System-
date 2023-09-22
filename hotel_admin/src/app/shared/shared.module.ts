import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAlertComponent } from '../common/custom-alert/custom-alert.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';



@NgModule({
  declarations: [CustomAlertComponent, PaginationComponent,SpinnerComponent],
  imports: [CommonModule],
  exports: [CustomAlertComponent, PaginationComponent,SpinnerComponent] // Ensure CustomAlertComponent is exported
})
export class SharedModule { }
