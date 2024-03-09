import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { 
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
