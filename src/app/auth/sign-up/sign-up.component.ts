import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  code: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.code = params['code'];
        // if(this.code !== 'undefined') {
        //   window.location.href="https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&scope=ZohoCreator.form.CREATE&redirect_uri=https://tensketch.vanavihari.com/register.html&access_type=offline";
        // }
      });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(form.value);
      console.log(this.code);

  
      this.http.post<any>('/api/oauth/v2/token?grant_type=authorization_code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&redirect_uri=https://tensketch.vanavihari.com/register.html&code=' + this.code, {})
      .subscribe(
        response => {
          console.log("Response:", response);
        },
        error => {
          console.error("Error:", error);
        }
      );
    

    }
  }
  
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
