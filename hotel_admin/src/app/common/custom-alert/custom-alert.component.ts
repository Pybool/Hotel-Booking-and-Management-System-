import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css'],
})
export class CustomAlertComponent {
  @Input() show: Boolean = false;
  @Input() message: string = 'Default alert message.';
  @Input() duration: number = 5000; // Default duration in milliseconds
  @Input() backgroundColor: string = '#ffc107'; // Default background color
  alertTimeout: any;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['show'] && changes['show'].currentValue === true) {
  //     this.showAlertMessage();
  //   }
  // }

  showAlertMessage() {
    this.show = true;

    // Automatically dismiss alert after the specified duration
    this.alertTimeout = setTimeout(() => {
      this.dismiss();
    }, this.duration);
  }

  dismiss() {
    this.show = false;
    clearTimeout(this.alertTimeout);
  }
}
