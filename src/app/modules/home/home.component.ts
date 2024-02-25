import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NativeDateAdapter } from '@angular/material/core';
//import { CustomEvent } from '@angular/elements';

import { UserService } from '../../user.service';
//import lightGallery from 'lightgallery';
declare var lightGallery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [NativeDateAdapter],
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentUser: string;
  // Define an array to hold the image filenames
  imageFilenames: string[] = [];
  imageFilenames1: string[] = [];
  currentImage: string | null = null;
  constructor(private http: HttpClient, private userService: UserService) {
    this.currentImage = this.imageFilenames[0];
    // Generate image filenames from vanavihari-home-gallery-2.jpg to vanavihari-home-gallery-16.jpg
    for (let i = 2; i <= 16; i++) {
      this.imageFilenames.push(`vanavihari-home-gallery-${i}.jpg`);
      this.imageFilenames1.push(`junglestar-home-gallery-${i}.jpg`);
    }
    
  
    
  }
  
  moveLeft() {
    const currentIndex = this.imageFilenames.indexOf(this.currentImage!);
    if (currentIndex > 0) {
      this.currentImage = this.imageFilenames[currentIndex - 1];
    }
  } 
  moveRight() {
    const currentIndex = this.imageFilenames.indexOf(this.currentImage!);
    if (currentIndex < this.imageFilenames.length - 1) {
      this.currentImage = this.imageFilenames[currentIndex + 1];
    }
  }
  closeImage(){
    
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
    // Retrieve the logged-in user's data using the UserService
    const user = this.userService.getUser();
    this.currentUser = user ? user.full_name : '';
    console.log(this.currentUser);
    //alert('Registration successful!');
    
  }
  ngAfterViewInit(): void {
    lightGallery(document.getElementById('vanavihari-home-gallery'));
    lightGallery(document.getElementById('junglestar-home-gallery'));

    const vanavihariGallery = lightGallery(document.getElementById('vanavihari-gallery'));
  const junglestarGallery = lightGallery(document.getElementById('junglestar-gallery'));


    vanavihariGallery.on('afterSlide', (event: CustomEvent<any>) => {
      const image = event.detail.nextSlide.container.children[0];
      const title = image.getAttribute('title');
      vanavihariGallery.setTitle(title);
    });
  }


  



  // search bar adult, child, rooms

  adults: number = 1;
  children: number = 1;
  rooms: number = 1;

  increment(field: 'adults' | 'children' | 'rooms') {
    this[field]++;
  }

  decrement(field: 'adults' | 'children' | 'rooms') {
    if (this[field] > 0) {
      this[field]--;
    }
  }
}
function moveLeft() {
  throw new Error('Function not implemented.');
}

function moveRight() {
  throw new Error('Function not implemented.');
}

