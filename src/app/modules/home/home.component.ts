import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { NativeDateAdapter } from '@angular/material/core';
//import { CustomEvent } from '@angular/elements';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';


import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [NativeDateAdapter],
})
export class HomeComponent implements OnInit {
  //searchbar model
  @ViewChild('modal') modal: ElementRef;

  adultsCount: number = 1;
  childrenCount: number = 0;
  isMaxReached: boolean = false;
  maxChildren: number = 10;
  roomsCount: number = 1;
  ageDropdowns: number[] = [];
  selectedAges: string[] = [];

  //user
  currentUser: string;
  // Define an array to hold the image filenames
  imageFilenames: string[] = [];
  imageFilenames1: string[] = [];
  currentImage: string | null = null;
  constructor(private router: Router, private http: HttpClient, private userService: UserService) {
    this.currentImage = this.imageFilenames[0];
    // Generate image filenames from vanavihari-home-gallery-2.jpg to vanavihari-home-gallery-16.jpg
    for (let i = 2; i <= 16; i++) {
      this.imageFilenames.push(`assets/img/home-gallery/vanavihari-home-gallery-${i}.jpg`);
      this.imageFilenames1.push(`assets/img/home-gallery-junglestar/junglestar-home-gallery-${i}.jpg`);
    }

    this.updateAgeDropdowns(); // Initialize age dropdowns
  }

  // triggerURL() {
  //   let url = 'https://accounts.zoho.com/oauth/v2/token?grant_type=authorization_code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&redirect_uri=https://tensketch.vanavihari.com/register.html&code=1000.017ef0313753e74c6b7c381760976336.7560b12994f620fa6dc838f0b0a66170';
  //   return this.http.get(url).subscribe(
  //     (response) => {
  //       console.log('Response:', response);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    console.log(this.imageFilenames);
    console.log(this.imageFilenames1)
    
    // Retrieve the logged-in user's data using the UserService
    const user = this.userService.getUser();
    this.currentUser = user ? user.full_name : '';
    console.log(this.currentUser);
    //alert('Registration successful!');
  }
  openModal() {
    const modal = this.modal.nativeElement;
    modal.classList.add('show');
    modal.style.display = 'block';
  }

  decrementAdults() {
    if (this.adultsCount > 1) {
      this.adultsCount--;
    }
  }

  incrementAdults() {
    this.adultsCount++;
  }

  incrementChildren() {
    if (this.childrenCount < this.maxChildren) {
      this.childrenCount++;
      this.selectedAges = Array(this.childrenCount).fill(''); // Add an empty string for the new dropdown
      this.isMaxReached = false;
    } else {
      this.isMaxReached = true;
    }
  }

  decrementChildren() {
    if (this.childrenCount > 0) {
      this.childrenCount--;
      this.selectedAges.pop(); // Remove the selected value for the last dropdown
      this.isMaxReached = false;
    }
  }
  getChildrenCountArray() {
    return Array(this.childrenCount)
      .fill(0)
      .map((x, i) => i);
  }

  decrementRooms() {
    if (this.roomsCount > 1) {
      this.roomsCount--;
    }
  }

  incrementRooms() {
    this.roomsCount++;
  }

  updateAgeDropdowns() {
    // Clear existing dropdowns
    this.ageDropdowns = [];
    // Create dropdowns for each child
    for (let i = 0; i < this.childrenCount; i++) {
      this.ageDropdowns.push(i); // Add a placeholder for each child
    }
    // Ensure the selectedAges array has the correct length
    while (this.selectedAges.length < this.childrenCount) {
      this.selectedAges.push(''); // Add empty strings for each child
    }
  }

  settings = {
    counter: false,
    plugins: [lgZoom], // Include the lgZoom plugin
  };

  onBeforeSlide(detail: BeforeSlideDetail): void {
    const { index, prevIndex } = detail;
    console.log(`Slide changed from ${prevIndex} to ${index}`);
  }
  goToVanavihari() {
    this.router.navigate(['/resort-listing']);
  }
  goToJungleStar(){
    this.router.navigate(['/resort-listing']);

  }
}
function moveLeft() {
  throw new Error('Function not implemented.');
}

function moveRight() {
  throw new Error('Function not implemented.');
}
 