import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';

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
    LightgalleryModule,
    SharedRoutingModule,
  ],
  exports: [
    LightgalleryModule,
    GalleryComponent
  ]
})
export class SharedModule { }
