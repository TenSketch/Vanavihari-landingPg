import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      mobile_number: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['message']) {
        const message = params['message'];
        this.showSnackBarAlert(message);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const randomBytes = new Uint8Array(12);
      window.crypto.getRandomValues(randomBytes);
      const token = Array.from(randomBytes, (byte) =>
        ('0' + (byte & 0xff).toString(16)).slice(-2)
      ).join('');
      const params = new HttpParams()
        .set('user_name', this.form.value.mobile_number)
        .set('password', this.form.value.password)
        .set('get_token', token);

      this.http
        .get<any>(
          'https://www.zohoapis.in/creator/custom/venkatechnical/Login_Validation?publickey=BF11OPGzBTetAw61vT789FRMe',
          { params }
        )
        .subscribe({
          next: (response) => {
            if(response.code == 3000) {
              var res = response.result;
              res = res.split('-');
              if(res[0] == "TK") {
                this.router.navigate(['/home']);
                this.showSnackBarAlert("Login Success. Token: "+res[1], false);
              } else if(response.result == 'error'){
                this.showSnackBarAlert("Invalid Username | Password!");
              } else {
                this.showSnackBarAlert(response.result);
              }
            } else {
              this.showSnackBarAlert("Please Check this Credential!");
            }
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
    }
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToSignup() {
    this.router.navigate(['/sign-up']);
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
