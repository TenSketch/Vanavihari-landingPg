import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { 
    this.form = this.formBuilder.group({
      mobile_number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.openModal();
  }

  onSubmit() {
    if (this.form.valid) {
      const storedUser = this.userService.getUser();
      console.log(storedUser)
      if (storedUser && storedUser.mobile_number === this.form.value.mobile_number && storedUser.password === this.form.value.password) {
        this.router.navigate(['/home']);
        alert('Login successful! Welcome ' + storedUser.full_name);
      } else {
        alert('Invalid email or password');
      }
    }
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToSignup() {
    this.router.navigate(['/sign-up']);
  }

}
