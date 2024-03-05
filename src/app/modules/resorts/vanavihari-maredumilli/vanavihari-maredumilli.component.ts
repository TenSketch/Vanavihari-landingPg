import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../../user.service';

@Component({
  selector: 'app-vanavihari-maredumilli',
  templateUrl: './vanavihari-maredumilli.component.html',
  styleUrls: ['./vanavihari-maredumilli.component.scss'],
})
export class VanavihariMaredumilliComponent {
  selectedSortOption: string;
  showBookingSummary: boolean = false;
  constructor(private router: Router) {
    // Initialize default value
    this.selectedSortOption = 'lowToHigh';
  }

  addRoom() {
    this.showBookingSummary = true;
  }
  goToBooking() {
    this.router.navigate(['/booking-summary']);
  }
}
