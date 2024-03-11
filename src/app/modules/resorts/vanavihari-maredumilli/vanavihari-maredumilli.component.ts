import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsComponent } from '../rooms/rooms.component';
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
  roomCards: Room[] = [];
  roomIds: any[] = [];
  loadingRooms: boolean = true;

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
    this.http
      .get<any>(
        'https://vanavihari-ng.netlify.app/zoho-connect?api_type=room_list'
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
            console.log(jsonArray);
          this.roomCards = this.mapRoomData(jsonArray);
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

    // interface RoomDetails {
    //   name: string;
    //   max_child: number;
    //   week_end_guest_charge: number;
    //   cottage_type: string;
    //   max_guest: number;
    //   week_day_rate: number;
    //   id: number,
    //   aminities: {
    //     "4554333000000110021": string;
    //     "4554333000000110025": string;
    //     "4554333000000110017": string;
    //   };
    //   // Add other properties as needed
    // }
    
    // // // Sample JSON object with the defined type
    // const json: { [key: string]: RoomDetails } = {
    //   "4554333000000110059": {
    //     name: "room1",
    //     max_child: 1,
    //     week_end_guest_charge: 700,
    //     cottage_type: "Hill Top Guest House",
    //     max_guest: 3,
    //     week_day_rate: 2500,
    //     id: 301,
    //     aminities: {
    //       "4554333000000110021": "A/C",
    //       "4554333000000110025": "Western",
    //       "4554333000000110017": "Geyser"
    //     },
    //     // Other properties...
    //   },
    //   "4554333000000110065": {
    //     name: "room2",
    //     max_child: 1,
    //     week_end_guest_charge: 700,
    //     cottage_type: "Pre-Fabricated Cottages",
    //     max_guest: 3,
    //     week_day_rate: 2500,
    //     id: 302,
    //     aminities: {
    //       "4554333000000110021": "A/C",
    //       "4554333000000110025": "Western",
    //       "4554333000000110017": "Geyser"
    //     },
    //     // Other properties...
    //   },
    //   // Add more objects...
      
    // };
    
    
    // Convert JSON object to array
    // console.log(json);
    
    // const jsonArray = Object.keys(json).map(key => {
    //     return json[key];
    //     // return {
    //     //   id: key,
    //     //   ...json[key]
    //     // };
    // });
    // this.roomCards = this.mapRoomData(jsonArray);    
    // console.log(this.roomCards);

    // For demonstration purposes, setTimeout is used to mimic API call delay
    setTimeout(() => {
       this.loadingRooms = false;
    }, 2000); // Set loading time in milliseconds
    
  }

  mapRoomData(data: any[]): Room[] {
    return data.map((room) => ({
      name: room.name || 'Unknown',
      cottage_type: room.cottage_type || 'Unknown',
      id: room.id || 'Unknown',
      // bed_type: room.bed_type || 'Unknown',
      // amenities: Object.values(room.amenities) || [],
      // rating: room.rating || 'Unknown',
      max_adult: room.max_adult || 'Unknown',
      max_child: room.max_child || 'Unknown',
      max_guest: room.max_guest || 'Unknown',
      weekDayPrice: room.week_day_rate || 'Unknown',
      weekendPrice: room.week_end_rate || 'Unknown',
      weekDayGuestPrice: room.week_day_guest_charge || 'Unknown',
      weekendGuestPrice: room.week_end_guest_charge || 'Unknown',
      image: room.image || 'assets/img/bonnet/BONNET-OUTER-VIEW.jpg', // set a default image if it is not available
    }));
  }

  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

  addRoom(room:any) {
    let foundRoom = this.roomIds.find(singRoom => singRoom.id === room.id);
    if(!foundRoom) {
          this.roomIds.push(room);
        }
    console.log(this.roomIds);
    this.showBookingSummary = true;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const roomId of this.roomIds) {      
      if (roomId) {
        totalPrice += roomId.weekDayPrice;
      }
    }
    console.log(totalPrice);
    
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
