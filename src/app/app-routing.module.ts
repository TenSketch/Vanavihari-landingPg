import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { TouristPlacesComponent } from './modules/tourist-places/tourist-places.component';
import { AboutVanavihariComponent } from './modules/about-vanavihari/about-vanavihari.component';
import { VanavihariMaredumilliComponent } from './modules/resorts/vanavihari-maredumilli/vanavihari-maredumilli.component';
import { JungleStarEcoCampRampachodavaramComponent } from './modules/resorts/jungle-star-eco-camp-rampachodavaram/jungle-star-eco-camp-rampachodavaram.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { TribalCommunityComponent } from './modules/tribal-community/tribal-community.component';
import { AwardsNewsPublicationsComponent } from './modules/awards-news-publications/awards-news-publications.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './modules/terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
{path:'home', component:HomeComponent}, 
{path:'sign-in', component:SignInComponent}, 
{path:'sign-up', component:SignUpComponent}, 
{path:'about-vanavihari', component:AboutVanavihariComponent}, 
{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
{ path: '**', redirectTo: '/home' }, // Handle undefined routes (optional)

 //{path:'', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
