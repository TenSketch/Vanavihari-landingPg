import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  triggerURL() {
    let url = 'https://accounts.zoho.com/oauth/v2/token?grant_type=authorization_code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&redirect_uri=https://tensketch.vanavihari.com/register.html&code=1000.017ef0313753e74c6b7c381760976336.7560b12994f620fa6dc838f0b0a66170';
    return this.http.get(url).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
