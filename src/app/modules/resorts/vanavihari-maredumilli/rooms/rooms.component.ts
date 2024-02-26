import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  filteredRooms: any[] = []; // Stores the filtered rooms
  cottageFilters: string[] = ['All', 'Option 1', 'Option 2', 'Option 3']; // Cottage type filter options
  selectedCottageFilter: string = 'All'; // Selected cottage filter
  selectedSortOption: string = 'lowToHigh'; // Selected sort option

  // Sample room data (replace with actual data fetched from database)
  rooms: any[] = [
    { name: 'Room 1', cottageType: 'Option 1', price: 100 },
    { name: 'Room 2', cottageType: 'Option 2', price: 150 },
    { name: 'Room 3', cottageType: 'Option 1', price: 120 },
    // Add more room objects as needed
  ];

  constructor() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedCottageFilter === 'All') {
      // Show all rooms when 'All' is selected
      this.filteredRooms = this.rooms.slice();
    } else {
      // Filter rooms based on selected cottage type
      this.filteredRooms = this.rooms.filter(
        (room) => room.cottageType === this.selectedCottageFilter
      );
    }
    // Apply sorting after filtering
    this.applySort();
  }

  applySort() {
    if (this.selectedSortOption === 'lowToHigh') {
      // Sort rooms by price in ascending order
      this.filteredRooms.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'highToLow') {
      // Sort rooms by price in descending order
      this.filteredRooms.sort((a, b) => b.price - a.price);
    }
  }

  // Method to handle filter selection change
  applyFilterSelection(filter: string) {
    this.selectedCottageFilter = filter;
    this.applyFilter();
  }

  // Method to handle sort selection change
  applySortSelection(sortOption: string) {
    this.selectedSortOption = sortOption;
    this.applySort();
  }
}
