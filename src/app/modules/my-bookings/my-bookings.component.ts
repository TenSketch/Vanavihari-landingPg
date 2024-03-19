import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  constructor(private http: HttpClient, private userService: UserService) {}
  ngOnInit(): void {
    let params = new HttpParams()
    .set('email', this.userService.getUser())
    .set('token', this.userService.getUserToken());
    this.http
      .get<any>(
        'https://vanavihari-ng.netlify.app/zoho-connect?api_type=booking_history&'+params.toString()
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error('Error:', err);
        },
    });
  }
  
  fetchRoomList() {   
    // interface RoomDetails {
    //   name: string;
    //   week_end_guest_charge: number;
    //   cottage_type: string;
    //   week_day_rate: number;
    //   max_adult: number;
    //   max_child: number;
    //   max_guest: number;
    //   week_day_bed_charge: number,
    //   id: number,
    //   resort: string,
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
    //     name: "Room1",
    //     week_end_guest_charge: 700,
    //     cottage_type: "Hill Top Guest House",
    //     week_day_rate: 2500,
    //     max_adult: 2,
    //     max_child: 1,
    //     max_guest: 1,
    //     week_day_bed_charge: 500,
    //     id: 301,
    //     resort: 'Vanavihari',
    //     aminities: {
    //       "4554333000000110021": "A/C",
    //       "4554333000000110025": "Western",
    //       "4554333000000110017": "Geyser"
    //     },
    //     // Other properties...
    //   },
    //   "4554333000000110065": {
    //     name: "Room2",
    //     week_end_guest_charge: 700,
    //     cottage_type: "Pre-Fabricated Cottages",
    //     week_day_rate: 2500,
    //     max_adult: 2,
    //     max_child: 1,
    //     max_guest: 3,
    //     week_day_bed_charge: 500,
    //     id: 302,
    //     resort: 'Vanavihari',
    //     aminities: {
    //       "4554333000000110021": "A/C",
    //       "4554333000000110025": "Western",
    //       "4554333000000110017": "Geyser"
    //     },
    //     // Other properties...
    //   },
    //   // Add more objects...
      
    // };
    // const jsonArray = Object.keys(json).map(key => {
    //     return json[key];
    //     // return {
    //     //   id: key,
    //     //   ...json[key]
    //     // };
    // });
    // this.roomCards = this.mapRoomData(jsonArray, this.roomIds);

    // setTimeout(() => {
    //    this.loadingRooms = false;
    // }, 2000);
  }
}
