import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';

import { AppComponent } from '../../../app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VisiteursRoutingModule } from './visiteurs-routing.module';
import { VisiteurListComponent } from './visiteur-list/visiteur-list.component';
import { VisiteurAddDialogComponent } from './visiteur-add-dialog/visiteur-add-dialog.component';
import { VisiteurDetailComponent } from './visiteur-detail/visiteur-detail.component';


@NgModule({
  declarations: [
    VisiteurListComponent,
    VisiteurAddDialogComponent,
    VisiteurDetailComponent

  ],
  imports: [
    CommonModule,
    VisiteursRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class VisiteursModule { }
