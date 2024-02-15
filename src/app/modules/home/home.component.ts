import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NativeDateAdapter, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: NativeDateAdapter, deps:[MAT_DATE_FORMATS]},
    {provide: MAT_DATE_FORMATS, useValue:{useUtc: true}},
  ],

})
export class HomeComponent implements OnInit {
  currentUser: string;

  constructor(private http: HttpClient, private userService: UserService) {}

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

}
