import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-caller-details',
  templateUrl: './caller-details.component.html',
  styleUrls: ['./caller-details.component.scss']
})
export class CallerDetailsComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  goToVideoCallPage() {
    this.router.navigate(['/video-call']);
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
