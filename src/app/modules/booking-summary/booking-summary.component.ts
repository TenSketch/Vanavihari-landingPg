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
  adultsCount: number = 1;
  childrenCount: number = 0;
  roomsCount: number = 1;
  checkInDate: Date;
  checkOutDate: Date;
  constructor(private router: Router, private authService: AuthService) {
    console.log(this.authService.getBookingRooms());
  }
  ngOnInit(): void {
    this.adultsCount = this.authService.getSearchData()[0].adultsCount??1;
    this.childrenCount = this.authService.getSearchData()[0].childrenCount??0;
    this.roomsCount = this.authService.getSearchData()[0].roomsCount??1;
  }
  goToVanavihari() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
  gotosetting() {
    this.router.navigate(['/my-account/settings']);
  }
}
