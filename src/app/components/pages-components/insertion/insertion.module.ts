import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertionRoutingModule } from './insertion-routing.module';
import { InsertionListComponent } from './insertion-list/insertion-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InsertionCardComponent } from './insertion-card/insertion-card.component';
import { InsertionDetailComponent } from './insertion-detail/insertion-detail.component';


@NgModule({
  declarations: [
    InsertionListComponent,
    InsertionCardComponent,
    InsertionDetailComponent
  ],
  imports: [
    CommonModule,
    InsertionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class InsertionModule { }
