import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
// import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent {
  constructor(private router: Router, private authService: AuthService) {
    console.log(this.authService.getBookingRooms());
  }
  ngOnInit(): void {
    console.log(this.authService.getSearchData());
  }
  goToVanavihari() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
}
