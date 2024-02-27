import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerifyService } from '../../email-verify.service';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private emailVerifyService: EmailVerifyService
  ) {}

  ngOnInit(): void {
    const publickey = 'fArmqypVSku88tfArkejTR5wq';
    const verificationToken = this.route.snapshot.paramMap.get('token');
    if (verificationToken) {
      this.authService.sendDataToServer('Email_Verification?publickey='+publickey+'&token='+verificationToken, '').subscribe({
        next: response => {
          if(response.code == 3000) {
            if(response.result == 'success') {
              this.router.navigate(['/sign-in'], { queryParams: { message: 'Email Verification successful. Please sign in.' } });
            } else if(response.result == 'error') {
              this.router.navigate(['/sign-in'], { queryParams: { message: 'Email Verification Error. Please contact support.' } });
            } else {
              this.router.navigate(['/sign-in'], { queryParams: { message: response.result } });
            }
          } else {
            this.router.navigate(['/sign-in'], { queryParams: { message: 'Somthing Error for Email Verification!' } });
          }
        },
        error: err => {
          console.error('Email verification failed:', err);
          alert('Email verification failed. Please try again.');
          this.router.navigate(['/sign-in']);
        }
      });

    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}