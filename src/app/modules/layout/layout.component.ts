import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private router: Router) { }
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    
  }


  goToHome(){
    this.router.navigate(['/home']);
  }
    goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToAboutUs() {
    this.router.navigate(['/about-vanavihari']);
  }
  goToMyAccSettings() {
    this.router.navigate(['/my-account/settings']);
  }
  goToMyBookings() {
    this.router.navigate(['/my-account/my-bookings']);
  }
}
