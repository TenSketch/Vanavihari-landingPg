import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/postlogin/dashboard/dashboard.component';
import { CustomerInfoComponent } from './modules/postlogin/employee-verification/customer-info/customer-info.component';
import { CustomerRecordsComponent } from './modules/postlogin/employee-verification/customer-records/customer-records.component';
import { CallerDetailsComponent } from './modules/postlogin/employee-verification/videoConference/caller-details/caller-details.component'
import { VideoCallComponent } from './modules/postlogin/employee-verification/videoConference/video-call/video-call.component'
import { HomeComponent } from './modules/home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


const routes: Routes = [
{path:'home', component:HomeComponent}, 
{path:'sign-in', component:SignInComponent}, 
{path:'sign-up', component:SignUpComponent}, 
{path:'dashboard', component:DashboardComponent}, 
{path:'customer-info',component:CustomerInfoComponent},
{path:'customer-records',component:CustomerRecordsComponent},
{path:'caller-details',component:CallerDetailsComponent},
{path:'video-call',component:VideoCallComponent},

 {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
