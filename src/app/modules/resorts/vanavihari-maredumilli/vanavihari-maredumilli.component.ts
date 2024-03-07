import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { UserService } from '../../user.service';

@Component({
  selector: 'app-vanavihari-maredumilli',
  templateUrl: './vanavihari-maredumilli.component.html',
  styleUrls: ['./vanavihari-maredumilli.component.scss'],
})
export class VanavihariMaredumilliComponent {
  selectedSortOption: string;
  showBookingSummary: boolean = false;
  roomCards: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.selectedSortOption = 'lowToHigh';
  }

  ngOnInit(): void {
    this.fetchRoomList();
  }

  // roomCards: any[] = Array.from({ length: 4 }, (_, index) => ({
  //   roomName: 'Wood Pecker',
  //   cottageType: 'Wooden Cottages',
  //   bedType: '1 King Size double bed',
  //   amenities: ['AC', 'Geyser', 'Western Toilet'],
  //   rating: 'Good',
  //   price:
  //     '1 night, 3 adults, 1 child 4500 INR + GST @ 18%  Extra bed @ 1500 INR',
  //   image: 'assets/img/jungle.jpeg',
  // }));

  fetchRoomList() {
    this.http
      .get<any>(
        'https://vanavihari-ng.netlify.app/zoho-connect?api_type=room_list'
      )
      .subscribe({
        next: (response) => {
          if (response.code == 3000 && response.result.status == 'success') {
            // Map response data to roomCards array
            this.roomCards = response.rooms.map((room: any) => ({
              roomName: room.roomName,
              cottageType: room.cottageType,
              bedType: room.bedType,
              amenities: room.amenities,
              rating: room.rating,
              price: room.price,
              image: room.image,
            }));
          } else {
            this.showErrorAlert(
              'Failed to fetch room list. Please try again later.'
            );
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.showErrorAlert(
            'An error occurred while fetching room list. Please try again later.'
          );
        },
      });
  }

  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
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
