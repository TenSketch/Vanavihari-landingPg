import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [

  ]
})
export class SharedModule { }
