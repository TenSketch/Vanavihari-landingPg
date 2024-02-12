import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ZohoAuthServiceService } from '../../zoho-auth-service.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  code: any;
  password: any;
  repeat_password: any;
  private apiUrl = 'https://creator.zoho.com/api/v2/vanavihari/vanavihari-resort/form/Registration';
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private myService: ZohoAuthServiceService, private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }



  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.code = params['code'];
      });

    // Retrieve the code from the query params or from your logic
    // this.code = 'YOUR_CODE';

    // Make HTTP request to your Node.js endpoint
    this.http.post<any>('http://localhost:3000/authenticate', { code: this.code })
      .subscribe({
        next: response => {
          // Handle response, set access token, etc.
          console.log("Response: ",response);
        },
        error: err => {
          console.log(err);
        }
      });
  }


  // ngOnInit(): void {
  //   const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
  //   const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
  //   const redirectUri = 'https://tensketch.vanavihari.com/register.html';
  //   const grantType = 'authorization_code';
  //   const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

  //   this.route.queryParams.subscribe(params => {
  //     this.code = params['code'];
  //     if(this.code === 'undefined') {
  //       // this.myService.authorize();
  //     }
  //   });

  //     this.http.post<any>(tokenUrl+'?grant_type='+grantType+'&client_id='+clientId+'&client_secret='+clientSecret+'&redirect_uri='+redirectUri+'&code=' + this.code, {})
  //     .subscribe({
  //       next:response=> {
  //         this.authService.setAccessToken(response.access_token)
  //       },
  //       // error(err) {
  //       //   console.log(err);
  //       // },
  //       // complete() {
  //       //   console.log('complete');
  //       // }
  //     });
  // }

  onSubmit(): void {
    this.password = this.form.value.password;
    this.repeat_password = this.form.value.repeat_password;
    if (this.form.valid) {
      console.log(this.form.value);
      const accessToken = this.authService.getAccessToken();
      const requestBody = {
        data: {
          Full_Name: this.form.value.full_name,
          Email_Id: this.form.value.email_id,
          Mobile_Number: this.form.value.mobile_number,
          Password: this.form.value.password
        }
      };
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`).set('environment', `development`);
      // Make your API request with HttpClient
      this.http.post<any>(`${this.apiUrl}`, requestBody, { headers })
        .subscribe({
          next: response => {
            console.log(response.data.ID);
          },
          error: err => {
            console.log(err);
          },
          complete: () => { // Use arrow function to maintain the context of `this`
            this.showSuccessAlert();
          }
        });
    } else {
      console.log(this.form);
    }
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }
  showSuccessAlert() {
    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 3000 // Duration in milliseconds
    }).afterDismissed().subscribe(() => {
      // Redirect to another page after the Snackbar is closed
      // You can use Angular Router here to navigate to the desired page
      this.router.navigate(['/sign-in']);
    });
  }
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
