import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PreloginLayoutComponent } from './modules/layouts/prelogin-layout/prelogin-layout.component';
import { MainLayoutComponent } from './modules/layouts/main-layout/main-layout.component';
import { LoginComponent } from './auth/prelogin/login/login.component';
import { DashboardComponent } from './modules/postlogin/dashboard/dashboard.component';
import { CustomerRecordsComponent } from './modules/postlogin/employee-verification/customer-records/customer-records.component';
import { CustomerInfoComponent } from './modules/postlogin/employee-verification/customer-info/customer-info.component';
import { CallerDetailsComponent } from './modules/postlogin/employee-verification/videoConference/caller-details/caller-details.component';
import { VideoCallComponent } from './modules/postlogin/employee-verification/videoConference/video-call/video-call.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CustomerRecordsComponent,
    CustomerInfoComponent,
    CallerDetailsComponent,
    VideoCallComponent,
    MainLayoutComponent,
    PreloginLayoutComponent,
    HomeComponent,
    LayoutComponent,
    SignInComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgApexchartsModule,
    RouterModule,
    SharedModule,

  ],
  exports: [SharedModule],

  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
