import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ZohoAuthServiceService } from '../../zoho-auth-service.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  code: any;
  password: any;
  repeat_password: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private myService: ZohoAuthServiceService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group(
      {
        full_name: ['', Validators.required],
        mobile_number: ['', Validators.required],
        email_id: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeat_password: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.password = this.form.value.password;
    this.repeat_password = this.form.value.repeat_password;
    if (this.form.valid) {
      console.log(this.form.value);
      const params = new HttpParams()
      .set('full_name', this.form.value.full_name)
      .set('email', this.form.value.email_id)
      .set('mobile', this.form.value.mobile_number)
      .set('password', this.form.value.password);
    this.http.get<any>('https://www.zohoapis.in/creator/custom/venkatechnical/Account_Registration?publickey=23OYsfd8dxQ1uV2YTn1F4PM7h', { params })
      .subscribe({
        next: response => {
          if(response.code == 3000 && response.result == 'success') this.showSuccessAlert();
          else this.showErrorAlert(response.result);
        },
        error: err => {
          console.error('Error:', err);
        }
      });
    } else {
      this.showErrorAlert("Please Fill Form!");
    }
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }
  showSuccessAlert() {
    this.snackBar
      .open('Form submitted successfully!', 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
  }
  showErrorAlert(msg = '') {
    this.snackBar
      .open(msg, 'Close', {
        duration: 3000,
      });
  }
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
