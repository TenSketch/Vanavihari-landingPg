import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-resort',
  templateUrl: './search-resort.component.html',
  styleUrls: ['./search-resort.component.scss'],
})
export class SearchResortComponent implements OnInit {
  searchForm: FormGroup;
  @ViewChild('modal') modal: ElementRef;
  adultsCount: number = 1;
  childrenCount: number = 0;
  isMaxReached: boolean = false;
  maxChildren: number = 10;
  roomsCount: number = 1;
  selectedAges: string[] = [];
  ageDropdowns: number[];
  RoomValues: any;
  selectedResort: string = "vanavihari";
  checkinDate: string;
  checkoutDate: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      selectedResort: [],
      checkinDate: [],
      checkoutDate: []
    });
    this.updateAgeDropdowns();
    this.RoomValues = 'Adult-' + 2 + ' Children- ' + 0 + ' Rooms-' + 1;
  }
  ngOnInit(): void {
    if(this.authService.getSearchData("resort")) this.selectedResort = this.authService.getSearchData("resort");
    if(this.authService.getSearchData("checkin")) this.checkinDate = this.authService.getSearchData("checkin");
    if(this.authService.getSearchData("checkout")) this.checkoutDate = this.authService.getSearchData("checkout");
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
  }

  incrementAdults() {
    this.adultsCount++;
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
    if (this.roomsCount > 1) {
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
    this.authService.setSearchData( [{ resort: this.selectedResort, checkin: this.checkinDate, checkout: this.checkoutDate }]);
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
  goToRooms(){
    this.router.navigate(['/resorts/rooms' ]);
  }

  onDateChange(type: string, event: any): void {
    const selectedDate = event.value;
    const formattedDate = this.formatDate(selectedDate);
    if (type === 'checkin') {
      this.checkinDate = formattedDate;
    } else if (type === 'checkout') {
      this.checkoutDate = formattedDate;
    }
  }

  formatDate(date: Date): string {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;
    return formattedDate;
  }

}
