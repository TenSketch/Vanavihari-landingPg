import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { ZohoAuthServiceService } from '../../zoho-auth-service.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Regex } from 'src/app/utility/regex';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  showTermsModal: boolean = false;
  code: any;
  password: any;
  repeat_password: any;
  password_hide = true;
  repeate_password_hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private myService: ZohoAuthServiceService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {}
  // {
  //   this.form = this.formBuilder.group(
  //     {
  //       full_name: ['', Validators.compose([Validators.required, Validators.pattern(Regex.lettersAndSpaces)])],
  //       mobile_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
  //       email_id: ['', Validators.compose([Validators.required, Validators.email])],
  //       password: ['',Validators.compose([
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.maxLength(16),
  //         Validators.pattern(
  //           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
  //         ),
  //       ])],
  //       repeat_password: ['', Validators.compose([Validators.required])],
  //     },
  //     {
  //       validators: this.passwordMatchValidator,
  //     }
  //   );
  // }

  ngOnInit(): void {
    // mobile validation function- NO SPACE ALLOWED
    function mobileNumberValidator(control: FormControl): { [s: string]: boolean } | null {
      const mobileNumberPattern = /^[0-9]*$/;
    
      if (!mobileNumberPattern.test(control.value)) {
        return { 'invalidMobileNumber': true };
      }
    
      return null;
    }
    // full email validation func
    function emailValidator(control: FormControl): { [s: string]: boolean } | null {
      if (!control.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return { invalidEmail: true };
      }
      return null; // Return null when validation succeeds
    }
    this.form = this.formBuilder.group({
      full_name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$')])],
      // mobile_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      mobile_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        mobileNumberValidator
    ])],    
      // email_id: ['', Validators.compose([Validators.required, Validators.email])],
      email_id: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/),
      ])],
      repeat_password: ['', Validators.compose([Validators.required])]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  onSubmit(): void {
    this.password = this.form.value.password;
    this.repeat_password = this.form.value.repeat_password;
    if (this.form.valid) {
      const params = new HttpParams()
        .set('full_name', this.form.value.full_name)
        .set('email', this.form.value.email_id)
        .set('phone', this.form.value.mobile_number)
        .set('password', this.form.value.password);
      
      this.http
        .get<any>(
          'https://vanavihari-ng.netlify.app/zoho-connect?api_type=register',
          { params }
        )
        .subscribe({
          next: (response) => {
            if (response.code == 3000 && response.result.status == 'success')
              this.showSuccessAlert();
            else if (response.code == 3000)
              this.showErrorAlert(response.result.msg);
            else this.showErrorAlert('Please Check Input Fields!');
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
    } else {
      this.showErrorAlert('Please Fill Form!');
    }
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }

  togglePasswordVisibility(): void {
    this.password_hide = !this.password_hide;
  }

  toggleRepeatPasswordVisibility(): void {
    this.repeate_password_hide = !this.repeate_password_hide;
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
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
