import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsComponent } from '../rooms/rooms.component';
import { AuthService } from '../../../../app/auth.service';
import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../../user.service';

interface Room {
  //roomId:string;
  name: string;
  cottage_type: string;
  // bed_type: string;
  // amenities: string[];
  // rating: string;
  weekDayPrice: number;
  weekendPrice: number;
  weekDayGuestPrice: number;
  weekendGuestPrice: number;
  image: string;
  max_adult: number;
  max_child: number;
  max_guest: number;
}

@Component({
  selector: 'app-vanavihari-maredumilli',
  templateUrl: './vanavihari-maredumilli.component.html',
  styleUrls: ['./vanavihari-maredumilli.component.scss'],
})
export class VanavihariMaredumilliComponent {
  selectedSortOption: string;
  showBookingSummary: boolean = false;
  isButtonDisabled: boolean = false;
  roomCards: Room[] = [];
  roomIds: any[] = [];
  loadingRooms: boolean = true;
  selectedResort: string = '';
  checkinDate: Date;
  checkoutDate: Date;
  searchValue: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.selectedSortOption = 'lowToHigh';
  }

  ngOnInit(): void {
    this.roomIds = (this.authService.getBookingRooms() != null && this.authService.getBookingRooms() != '' && this.authService.getBookingRooms().length > 0) ? this.authService.getBookingRooms() : [];
    if (this.roomIds.length > 0) {
      this.showBookingSummary = true;
    }
    this.searchValue = this.route.queryParams.subscribe(params => {
      if(params['resort']) this.selectedResort = params['resort'];
      if(params['checkin']) this.checkinDate = params['checkin'];
      if(params['checkout']) this.checkoutDate = params['checkout'];
    });
    this.fetchRoomList();
  }

  // roomCards: any[] = Array.from({ length: 1 }, (_, index) => ({
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
    let perm = '';
    if(this.selectedResort) perm += `&resort=${this.selectedResort}`;
    if(this.checkinDate) perm += `&checkin=${this.checkinDate}`;
    if(this.checkoutDate) perm += `&checkout=${this.checkoutDate}`;
    this.http
      .get<any>(
        'https://vanavihari-ng.netlify.app/zoho-connect?api_type=room_list'+perm
      )
      .subscribe({
        next: (response) => {
          if (response.code === 3000 && response.result.status === 'success') {
            console.log(response);
            console.log(response.result.data);

            const json = response.result.data;
            const jsonArray = Object.keys(json).map(key => {
              return {
                id: key,
                ...json[key]
              };
            });
            this.roomCards = this.mapRoomData(jsonArray, this.roomIds);
          } else {
            this.showErrorAlert(
              'Failed to fetch room list. Please try again later.'
            );
          }
          this.loadingRooms = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.showErrorAlert(
            'An error occurred while fetching room list. Please try again later.'
          );
        },
    });
    setTimeout(() => {
      this.loadingRooms = false;
    }, 2000);
  }
 
  removeRoom(room: any, roomId: any) {
    room.isButtonDisabled = false;
    this.roomIds = this.roomIds.filter(room => room.id !== roomId);
    if (this.roomIds.length < 1) this.showBookingSummary = false;
    this.authService.setBookingRooms(this.roomIds);
    room.isButtonDisabled = false;
  }

  mapRoomData(data: any[], roomIds: any[]): Room[] {
    return data.map((room) => ({
      name: room.name || 'Unknown',
      cottage_type: room.cottage_type || 'Unknown',
      id: room.id || 'Unknown',
      max_adult: room.max_adult || 1,
      max_child: room.max_child || 0,
      max_guest: room.max_guest || 0,
      charges_per_bed: room.charges_per_bed || 0,
      weekDayPrice: room.week_day_rate || 'Unknown',
      weekendPrice: room.week_end_rate || 'Unknown',
      weekDayGuestPrice: room.week_day_guest_charge || 'Unknown',
      weekendGuestPrice: room.week_end_guest_charge || 'Unknown',
      isButtonDisabled: this.toggleButtonDisabledById(room.id, roomIds),
      image: room.image || 'assets/img/bonnet/BONNET-OUTER-VIEW.jpg', // set a default image if it is not available
    }));
  }
  toggleButtonDisabledById(room_id: number, roomIds: any[]): any {
    for (const roomId of roomIds) {
      if (roomId.id === room_id) return true;
    }
    return false;
  }
  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

  addRoom(room: any) {
    let foundRoom = this.roomIds.find(singRoom => singRoom.id === room.id);
    if (!foundRoom) { this.roomIds.push(room); }
    this.showBookingSummary = true;
    room.isButtonDisabled = true;
    this.authService.setBookingRooms(this.roomIds);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const roomId of this.roomIds) {
      if (roomId) {
        totalPrice += roomId.weekDayPrice;
      }
    }
    return totalPrice;
  }

  calculatePayablePrice(): number {
    const totalPrice = this.calculateTotalPrice();
    const gstPercentage = 0.12; // GST @12%
    const gstAmount = totalPrice * gstPercentage;
    const payablePrice = totalPrice + gstAmount;
    return payablePrice;
  }
  goToBooking() {
    this.router.navigate(['/booking-summary']);
  }
  trackByRoomCard(index: number, card: any): string {
    return card.roomName;
  }
}
