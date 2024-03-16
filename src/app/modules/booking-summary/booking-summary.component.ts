import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  checkInDate: string;
  checkOutDate: string;
  durationOfStay: number = 1;
  seslectedResort: string;
  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    console.log(this.authService.getBookingRooms());    
    this.form = this.formBuilder.group({
      gname: ['Venkat'],
      gphone: ['8056562076'],
      gemail: ['venkat408prabhu@gmail.com', Validators.email],
      gaddress: [''],
      gcity: [''],
      gstate: [''],
      gpincode: [''],
      gcountry: ['']
    });
  }
  ngOnInit(): void {
    this.checkInDate = this.authService.getSearchData('checkin');
    this.checkOutDate = this.authService.getSearchData('checkout');
    this.seslectedResort = this.authService.getSearchData('resort');
    // const params = new HttpParams()
    //   .set('email', this.authService.getAccountUsername()??'')
    //   .set('token', this.authService.getAccessToken()??'');
    // this.http.get<any>('https://vanavihari-ng.netlify.app/zoho-connect?api_type=profile_details', {params}).subscribe({
    //   next: response => {
    //     if(response.code == 3000 && response.result.status == 'success') {
    //       this.form = this.formBuilder.group({
    //         gname: [response.result.name],
    //         gphone: [response.result.phone],
    //         gemail: [response.result.email, Validators.email],
    //         dob: [response.result.dob, Validators.required],
    //         nationality: [response.result.nationality],
    //         gaddress: [response.result.address1],
    //         address2: [response.result.address2],
    //         gcity: [response.result.city],
    //         gstate: [response.result.state],
    //         gpincode: [response.result.pincode],
    //         gcountry: [response.result.country]
    //       });
    //     } else if (response.code == 3000) {
    //       this.userService.clearUser();
    //       alert('Login Error!');
    //       // this.router.navigate(['/home']);
    //     } else {
    //       this.userService.clearUser();
    //       alert('Login Error!');
    //       // this.router.navigate(['/home']);
    //     }
    //   },
    //   error: err => {
    //     console.error('Error:', err);
    //   }
    // });


  }
  goToVanavihari() {
    this.router.navigate(['/resorts/vanavihari-maredumilli']);
  }
  submitBooking() {
    console.log(this.form.valid);
    
    if(this.form.valid) {
      console.log(this.form.value);
      let params = new HttpParams()
      .set('email', this.authService.getAccountUsername()??'')
      .set('token', this.authService.getAccessToken()??'')
      .set('checkin', this.checkInDate)
      .set('checkout', this.checkOutDate)
      .set('resort', this.seslectedResort);
      Object.keys(this.form.value).forEach((key) => {
        params = params.append(key, this.form.value[key]);
      });
      this.http.get<any>('https://vanavihari-ng.netlify.app/zoho-connect?api_type=booking', {params}).subscribe({
        next: response => {
          if(response.code == 3000 && response.result.status == 'success') {
            // this.router.navigate(['/home']);
            // this.showSnackBarAlert("Login Success. Token: "+response.result.token, false);
            this.authService.setAccessToken(response.result.token);
            this.authService.setAccountUsername(this.form.value.email_address);
            this.authService.setAccountUserFullname(response.result.userfullname);
          } else if (response.code == 3000) {
            // this.showSnackBarAlert(response.result.msg);
          } else {
            // this.showSnackBarAlert("Please Check this Credential!");
          }
        },
        error: err => {
          console.error('Error:', err);
        }
      });
    }
  }


  showSnackBarAlert(msg = '', redirect = true) {
    var snackBar = this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
    if (redirect) {
      snackBar.afterDismissed().subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
    }
  }
}
