import { Component } from '@angular/core';

@Component({
  selector: 'app-resort-listing',
  templateUrl: './resort-listing.component.html',
  styleUrls: ['./resort-listing.component.scss']
})
export class ResortListingComponent {
  isSidebarOpen: boolean =false;
  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar()
  {
    this.isSidebarOpen = false;
  }
}
