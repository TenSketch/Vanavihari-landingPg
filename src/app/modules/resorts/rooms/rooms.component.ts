import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { UserService } from '../../user.service';

interface Room {
  name: string;
  cottage_type: string;
  bed_type: string;
  amenities: string[];
  rating: string;
  weekDayPrice: string;
  weekendPrice: string;
  weekDayGuestPrice: string;
  weekendGuestPrice: string;
  image: string;
}
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  selectedSortOption: string;
  showBookingSummary: boolean = false;
  roomCards: Room[] = [];

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
          if (response.code === 3000 && response.result.status === 'success') {
            this.roomCards = this.mapRoomData(response.result.data);
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

  mapRoomData(data: any[]): Room[] {
    return data.map((room) => ({
      name: room.name || 'Unknown',
      cottage_type: room.cottage_type || 'Unknown',
      bed_type: room.bed_type || 'Unknown',
      amenities: Object.values(room.amenities) || [],
      rating: room.rating || 'Unknown',
      weekDayPrice: room.week_day_rate || 'Unknown',
      weekendPrice: room.week_end_rate || 'Unknown',
      weekDayGuestPrice: room.week_day_guest_rate || 'Unknown',
      weekendGuestPrice: room.week_end_guest_rate || 'Unknown',
      image: room.image || 'assets/img/default-room-image.jpg', // set a default image if it is not available
    }));
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
