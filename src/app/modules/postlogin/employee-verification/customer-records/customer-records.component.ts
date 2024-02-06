import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface UserData {
  name: string;
  progress: string;
  updatedOn: string;
  actionBy: string;
  mobileNo: string;
  appointmentOn: string;
  accountNo: string;
}
@Component({
  selector: 'app-customer-records',
  templateUrl: './customer-records.component.html',
  styleUrls: ['./customer-records.component.scss']
})
export class CustomerRecordsComponent implements AfterViewInit {
  myGroup: FormGroup | any;
  dateRangeForm: FormGroup;
  displayedColumns: string[] = ['name', 'progress', 'updatedOn', 'actionBy', 'mobileNo', 'appointmentOn', 'accountNo'];
  dataSource: MatTableDataSource<UserData>;
  // Define the users array
  users: UserData[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.dateRangeForm = this.formBuilder.group({
      startDate: null,
      endDate: null
    }, { validator: this.dateRangeValidator });
    // Create an array of your custom UserData objects
    this.users = [
      {
        name: 'Bala',
        progress: 'Under Verification',
        updatedOn: '15/09/2023, 10:23 AM',
        actionBy: '5828',
        mobileNo: '9840166419',
        appointmentOn: '15/09/2023, 10:23 AM',
        accountNo: '7045177792'
      },
      {
        "name": "Bahar",
        "progress": "Completed",
        "updatedOn": "12/08/2023, 2:23 PM",
        "actionBy": "5828",
        "mobileNo": "9840166419",
        "appointmentOn": "12/08/2023, 2:23 PM",
        "accountNo": "7045177792"
      },
      {
        "name": "Manish",
        "progress": "Rejected",
        "updatedOn": "12/08/2023, 3:23 PM",
        "actionBy": "5838",
        "mobileNo": "9840166419",
        "appointmentOn": "12/08/2023, 3:23 PM",
        "accountNo": "7045177792"
      },
      {
        "name": "Vaibhav",
        "progress": "Under Verification",
        "updatedOn": "10/07/2023, 10:00 AM",
        "actionBy": "5838",
        "mobileNo": "9840166419",
        "appointmentOn": "10/07/2023, 10:00 AM",
        "accountNo": "7045177792"
      }
      // Add more data here...
    ];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }
  dateRangeValidator(formGroup: FormGroup) {
    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
    const startDate = startDateControl ? startDateControl.value : null;
    const endDate = endDateControl ? endDateControl.value : null;
    if (startDate && endDate && startDate > endDate) {
      return { dateRangeError: true };
    }
    return null;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToCustomerInfo() {
    console.log("clicked");
    this.router.navigate(['/customer-info']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}