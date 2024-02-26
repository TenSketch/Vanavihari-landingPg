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
  showTermsModal: boolean = false;
  code: any;
  password: any;
  repeat_password: any;
  private apiUrl =
    'https://creator.zoho.com/api/v2/vanavihari/vanavihari-resort/form/Registration';
  @ViewChild('divID') divID: ElementRef;
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

  ngOnInit(): void {
    // const clientId = '1000.C3YEEYUWBVTK62AVHRVQT3EZR1Y48X';
    // const clientSecret = '74b59cd0d3a4a113aa62b0143fd05a06d9df6dce1b';
    // const redirectUri = 'http://localhost:4200';
    // const grantType = 'authorization_code';
    // const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
    // const params = new URLSearchParams({
    //   grant_type: grantType,
    //   client_id: clientId,
    //   client_secret: clientSecret,
    //   redirect_uri: 'https://tensketch.vanavihari.com/register.html',
    //   code: '1000.a97ec7608852e31d45a8a75011d3cfbd.b587497cbf28cfb2d878c2adae23bff9'
    // });
    // const url = `${tokenUrl}?${params.toString()}`;
    // console.log(url);
    // this.http
    //   .post(url, { responseType: 'text' as const })
    //   .subscribe({
    //     next: result => {
    //       console.log(result);
    //     }
    //   });

    // return;
    const getCodeUrl =
      'https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.C3YEEYUWBVTK62AVHRVQT3EZR1Y48X&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&scope=ZohoCreator.form.CREATE&redirect_uri=https://tensketch.vanavihari.com/register.html&access_type=offline';
    // this.route.queryParams.subscribe((params) => {
    //   this.code = params['code'];
    // });
    this.http.get(getCodeUrl, { responseType: 'text' as const }).subscribe({
      next: (result) => {
        let index = result.indexOf('window.location.href');
        var html_res = result.substring(index);

        var regex = /window\.location\.href\s*=\s*'([^']+)'/;
        var match = regex.exec(html_res);

        var url = String(match ? match[1] : null);
        var decodedUrl = decodeURIComponent(url.replace(/\\x/g, '%'));
        var url2;
        try {
          url2 = new URL(decodedUrl);
        } catch (e) {
          console.error('Invalid URL:', decodedUrl);
        }
        var codeParameter = url2?.searchParams.get('code');
        this.code = codeParameter ? codeParameter : '';

        const params = new HttpParams().set('code', this.code);
        this.http
          .post<any>('http://localhost:3000/authenticate', { code: this.code })
          .subscribe({
            next: (response) => {
              // console.log("Response: ",response.access_token);
              this.authService.setAccessToken(response.access_token);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
          Password: this.form.value.password,
        },
      };

      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
        .set('environment', `development`);
      this.http
        .post<any>(`${this.apiUrl}`, requestBody, { headers })
        .subscribe({
          next: (response) => {
            console.log(response.data.ID);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.showSuccessAlert();
          },
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
    this.snackBar
      .open('Form submitted successfully!', 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
  }
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }

  //Terms & conditions modelbox
  toggleTermsModal(checked: boolean) {
    if (checked) {
      this.showTermsModal = true;
    }
  }

  agreeToTerms() {
    // Perform actions when user agrees to terms
    // For example, you can submit the form or perform any other action here
    this.showTermsModal = false; // Hide the modal
    // Optionally, update the form control related to the checkbox to reflect the agreement
  }
}
