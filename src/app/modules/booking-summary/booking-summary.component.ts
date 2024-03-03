import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent {
  constructor(private router: Router) {}
  goToVanavihari() {
    this.router.navigate(['/resort-listing']);
  }
}
