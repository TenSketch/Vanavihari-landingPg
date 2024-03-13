import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsComponent } from '../rooms/rooms.component';
import { AuthService } from '../../../../app/auth.service';
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
 
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.selectedSortOption = 'lowToHigh';
  }

  ngOnInit(): void {
    this.roomIds = (this.authService.getBookingRooms().length>0)?this.authService.getBookingRooms():[];
    if(this.roomIds.length > 0) {
      this.showBookingSummary = true;
    }
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
    // this.http
    //   .get<any>(
    //     'https://vanavihari-ng.netlify.app/zoho-connect?api_type=room_list'
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       if (response.code === 3000 && response.result.status === 'success') {
    //         console.log(response);
    //         console.log(response.result.data);
            
    //         const json = response.result.data;
    //         const jsonArray = Object.keys(json).map(key => {
    //           return {
    //             id: key,
    //             ...json[key]
    //           };
    //         });
    //         console.log(jsonArray);
    //       this.roomCards = this.mapRoomData(jsonArray);
    //             } else {
    //         this.showErrorAlert(
    //           'Failed to fetch room list. Please try again later.'
    //         );
    //       }
    //      this.loadingRooms = false;
    //     },
    //     error: (err) => {
    //       console.error('Error:', err);
    //       this.showErrorAlert(
    //         'An error occurred while fetching room list. Please try again later.'
    //       );
    //     },
    //   });

    interface RoomDetails {
      name: string;
      week_end_guest_charge: number;
      cottage_type: string;
      week_day_rate: number;
      max_adult: number;
      max_child: number;
      max_guest: number;
      charges_per_bed: number,
      id: number,
      aminities: {
        "4554333000000110021": string;
        "4554333000000110025": string;
        "4554333000000110017": string;
      };
      // Add other properties as needed
    }
    
    // // Sample JSON object with the defined type
    const json: { [key: string]: RoomDetails } = {
      "4554333000000110059": {
        name: "room1",
        week_end_guest_charge: 700,
        cottage_type: "Hill Top Guest House",
        week_day_rate: 2500,
        max_adult: 2,
        max_child: 1,
        max_guest: 1,
        charges_per_bed: 500,
        id: 301,
        aminities: {
          "4554333000000110021": "A/C",
          "4554333000000110025": "Western",
          "4554333000000110017": "Geyser"
        },
        // Other properties...
      },
      "4554333000000110065": {
        name: "room2",
        week_end_guest_charge: 700,
        cottage_type: "Pre-Fabricated Cottages",
        week_day_rate: 2500,
        max_adult: 2,
        max_child: 1,
        max_guest: 1,
        charges_per_bed: 500,
        id: 302,
        aminities: {
          "4554333000000110021": "A/C",
          "4554333000000110025": "Western",
          "4554333000000110017": "Geyser"
        },
        // Other properties...
      },
      // Add more objects...
      
    };
    const jsonArray = Object.keys(json).map(key => {
        return json[key];
        // return {
        //   id: key,
        //   ...json[key]
        // };
    });
    this.roomCards = this.mapRoomData(jsonArray, this.roomIds);

    setTimeout(() => {
       this.loadingRooms = false;
    }, 2000);
    
  }

  // decrementAdult(room: any) {
  //   if (room.adult_count > 1) {
  //     room.adult_count--;
  //   }
  // }

  // incrementAdult(room: any) {
  //   if(room.adult_count < room.max_adult && room.child_count < 2) {
  //     room.adult_count++;
  //   }
  // } 

  // decrementChild(room: any) {
  //   if (room.child_count > 0) {
  //     room.child_count--;
  //   }
  // }

  // incrementChild(room: any) {
  //   if(room.child_count < room.max_child || (room.adult_count < 2 && room.child_count < 2)) {
  //     room.child_count++;
  //   }
  // } 

  // decrementGuest(room: any) {
  //   if (room.guest_count > 0) {
  //     room.guest_count--;
  //   }
  // }

  // incrementGuest(room: any) {
  //   if(room.guest_count < room.max_guest) {
  //     room.guest_count++;
  //   }
  // } 

  removeRoom(room: any, roomId: any) {
    room.isButtonDisabled = false;
    this.roomIds = this.roomIds.filter(room => room.id !== roomId);
    if(this.roomIds.length < 1) this.showBookingSummary = false;
    room.isButtonDisabled = false;
    this.authService.setBookingRooms(this.roomIds);
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

  addRoom(room:any) {
    let foundRoom = this.roomIds.find(singRoom => singRoom.id === room.id);
    if(!foundRoom) { this.roomIds.push(room); }
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
