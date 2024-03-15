import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent {
  form: FormGroup;
  adultsCount: number = 1;
  childrenCount: number = 0;
  roomsCount: number = 1;
  checkInDate: Date;
  checkOutDate: Date;
  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private formBuilder: FormBuilder, private userService: UserService) {
    console.log(this.authService.getBookingRooms());
    this.form = this.formBuilder.group({
      full_name: ['Venkat'],
      mobile_number: ['8056562076'],
      email: ['venkat408prabhu@gmail.com', Validators.email],
      dob: ['', Validators.required],
      nationality: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      pincode: [''],
      country: ['']
    });
  }
  ngOnInit(): void {
    this.adultsCount = this.authService.getSearchData()[0].adultsCount??1;
    this.childrenCount = this.authService.getSearchData()[0].childrenCount??0;
    this.roomsCount = this.authService.getSearchData()[0].roomsCount??1;

    const params = new HttpParams()
      .set('email', this.authService.getAccountUsername()??'')
      .set('token', this.authService.getAccessToken()??'');
    this.http.get<any>('https://vanavihari-ng.netlify.app/zoho-connect?api_type=profile_details', {params}).subscribe({
      next: response => {
        if(response.code == 3000 && response.result.status == 'success') {
          this.form = this.formBuilder.group({
            full_name: [response.result.name],
            mobile_number: [response.result.phone],
            email: [response.result.email, Validators.email],
            dob: [response.result.dob, Validators.required],
            nationality: [response.result.nationality],
            address1: [response.result.address1],
            address2: [response.result.address2],
            city: [response.result.city],
            state: [response.result.state],
            pincode: [response.result.pincode],
            country: [response.result.country]
          });
        } else if (response.code == 3000) {
          this.userService.clearUser();
          alert('Login Error!');
          // this.router.navigate(['/home']);
        } else {
          this.userService.clearUser();
          alert('Login Error!');
          // this.router.navigate(['/home']);
        }
      },
      error: err => {
        console.error('Error:', err);
      }
    });


  }
  goToVanavihari() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
}
