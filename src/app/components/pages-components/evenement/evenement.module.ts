import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventDialogBox, EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';


@NgModule({
  declarations: [
    EventListComponent,
    AddEventDialogBox,
    EventDetailsComponent,

  ],
  imports: [
    CommonModule,
    EvenementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EvenementModule { }
