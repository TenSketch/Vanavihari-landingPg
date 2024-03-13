import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-search-resort',
  templateUrl: './search-resort.component.html',
  styleUrls: ['./search-resort.component.scss'],
})
export class SearchResortComponent implements OnInit {
  ngOnInit(): void {}

  //searchbar model
  @ViewChild('modal') modal: ElementRef;
  adultsCount: number = 1;
  childrenCount: number = 0;
  roomsCount: number = 1;
  checkInDate: Date;
  checkOutDate: Date;
  extraBed: number = 0;
  isMaxReached: boolean = false;
  maxChildren: number = 10;
  minRooms: number = 1;
  selectedAges: string[] = [];
  ageDropdowns: number[];
  RoomValues: any;
  selectedResort: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.updateAgeDropdowns();
    this.RoomValues = 'Adult-' + 2 + ' Children- ' + 0 + ' Rooms-' + 1;
  }

  // openModal() {
  //   const modal = this.modal.nativeElement;
  //   modal.classList.add('show');
  //   modal.style.display = 'block';
  // }

  decrementAdults() {
    if (this.adultsCount > 1) {
      this.adultsCount--;
    }

    if((this.adultsCount)%3==0) { this.minRooms>1?this.minRooms--:''; this.extraBed = 1; }
    else if((this.adultsCount-1)%3 == 0) { this.minRooms>1?this.minRooms--:''; this.extraBed = 0; }
    else this.extraBed = 0;
  }

  incrementAdults() {
    this.adultsCount++;
    
    if((this.adultsCount)%3==0) { this.minRooms>1?this.minRooms++:''; this.extraBed = 1; }
    else if((this.adultsCount-1)%3 == 0) { this.minRooms++; this.roomsCount<this.minRooms?this.minRooms=this.minRooms:''; this.extraBed = 0; }
    else this.extraBed = 0;
  }

  incrementChildren() {
    if (this.childrenCount < this.maxChildren) {
      this.childrenCount++;
      this.selectedAges = Array(this.childrenCount).fill('');
      this.isMaxReached = false;
    } else {
      this.isMaxReached = true;
    }
  }

  decrementChildren() {
    if (this.childrenCount > 0) {
      this.childrenCount--;
      this.selectedAges.pop();
      this.isMaxReached = false;
    }
  }
  getChildrenCountArray() {
    return Array(this.childrenCount)
      .fill(0)
      .map((x, i) => i);
  }

  decrementRooms() {
    if (this.roomsCount > this.minRooms) {
      this.roomsCount--;
    }
  }

  incrementRooms() {
    this.roomsCount++;
  }

  updateAgeDropdowns() {
    this.ageDropdowns = [];
    for (let i = 0; i < this.childrenCount; i++) {
      this.ageDropdowns.push(i);
    }
    while (this.selectedAges.length < this.childrenCount) {
      this.selectedAges.push('');
    }
  }

  getvalues(roomsCount: any, adultsCount: any) {
    this.RoomValues =
      'Adult-' +
      this.adultsCount +
      ' Children- ' +
      this.childrenCount +
      ' Rooms-' +
      this.roomsCount;
    console.log(this.roomsCount, this.adultsCount);
  }

  goToVanavihari() {
    this.authService.setSearchData([{'adultsCount':this.adultsCount, 'childrenCount':this.childrenCount, 'roomsCount':this.roomsCount, 'checkInDate':this.checkInDate, 'checkOutDate':this.checkOutDate}]);
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
  onRoomCountChange(event: Event): void {
    if (this.roomsCount < 1) {
      console.log(this.roomsCount);
      this.roomsCount = 1;
    }
  }
}
