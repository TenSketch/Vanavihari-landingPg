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
  roomCards: any[] = Array.from({ length: 4 }, (_, index) => ({
    roomName: 'Wood Pecker',
    cottageType: 'Wooden Cottages',
    bedType: '1 King Size double bed',
    amenities: ['AC', 'Geyser', 'Western Toilet'],
    rating: 'Good',
    price: '1 night, 3 adults, 1 child 4500 INR + GST @ 18%  Extra bed @ 1500 INR',
    image: 'assets/img/jungle.jpeg',
  }));
  constructor(private router: Router) {
  
    this.selectedSortOption = 'lowToHigh';
  }

  addRoom() {
    this.showBookingSummary = true;
  }
  goToBooking() {
    this.router.navigate(['/booking-summary']);
  }
  trackByRoomCard(index: number, card: any): string {
    return card.roomName;
  }
}
