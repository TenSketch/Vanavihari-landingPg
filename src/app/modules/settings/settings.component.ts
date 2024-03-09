import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent
{
  form: FormGroup;
  editingField: string | null=null;
  storedUser: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService, private http: HttpClient) { 
    this.form = this.formBuilder.group({
      full_name: ['John Doe'],
      mobile_number: ['8945006212'],
      email: ['john.doe@example.com', Validators.email],
      dob: ['', Validators.required],
      nationality: [''],
      address: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    // this.openModal();
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
            address: [response.result.address]
          });
        } else if (response.code == 3000) {
          this.userService.clearUser();
          alert('Login Error!');
          this.router.navigate(['/home']);
        } else {
          this.userService.clearUser();
          alert('Login Error!');
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        console.error('Error:', err);
      }
    });
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
  editField(field: string) {
    this.editingField = field;
  }
  cancelEditing(field: string) {
    this.form.patchValue(this.storedUser);
    this.editingField = null;
  }

  saveChanges(field: string) {
    
    this.storedUser = { ...this.storedUser, ...this.form.value };
    this.userService.setUser(this.storedUser); 
    this.editingField = null;
    alert('Changes saved successfully!');
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
  goToSignup() {
    this.router.navigate(['/sign-up']);
  }

}
