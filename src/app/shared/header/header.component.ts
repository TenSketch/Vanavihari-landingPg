import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class headerComponent implements OnInit {
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  isRead: boolean = false;
  toggleRead(){
    console.log(this.isRead);
    this.isRead = !this.isRead;
  }
  isClearMsg: boolean = false;
  clearMsg() {
    this.isClearMsg = !this.isClearMsg;
    console.log(" notification msg cleared = ", this.isClearMsg);
  }
  isNotificationDropdownActive:boolean = false;
  toggleNotificationList(){
    this.isNotificationDropdownActive = !this.isNotificationDropdownActive;
    console.log("notificationDropdownActive"); 
  }
  isNavbarDropdownActive:boolean = false;
  dropdownToggle(){
    this.isNavbarDropdownActive = !this.isNavbarDropdownActive;
    console.log(this.isNavbarDropdownActive); 
  }
}
