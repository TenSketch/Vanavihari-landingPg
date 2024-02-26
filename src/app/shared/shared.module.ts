import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    BreadcrumbsComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    GalleryComponent
  ]
})
export class SharedModule { }
