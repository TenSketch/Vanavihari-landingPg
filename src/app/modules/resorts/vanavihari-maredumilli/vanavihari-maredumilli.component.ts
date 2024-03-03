import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../../user.service';


@Component({
  selector: 'app-vanavihari-maredumilli',
  templateUrl: './vanavihari-maredumilli.component.html',
  styleUrls: ['./vanavihari-maredumilli.component.scss']
})
export class VanavihariMaredumilliComponent {
  constructor(private router: Router) {}

  isRoomListingSidebarOpen: boolean =false;
  showBookingSummary: boolean =false;
  toggleRoomListingSidebar(){
    this.isRoomListingSidebarOpen = !this.isRoomListingSidebarOpen;
  }
  closeSidebar()
  {
    this.isRoomListingSidebarOpen = false;
  }
  addRoom()
  {
    this.showBookingSummary=true;
  }
  goToBooking()
  {
    this.router.navigate(['/booking-summary']);
  }
}
