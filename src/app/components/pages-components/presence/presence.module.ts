import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenceRoutingModule } from './presence-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AppComponent } from '../../../app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PresenceListComponent } from './presence-list/presence-list.component';
import { PresenceDateComponent } from './presence-date/presence-date.component';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    PresenceListComponent,
    PresenceDateComponent,
  ],
  imports: [
    CommonModule,
    PresenceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    
  ],
  bootstrap: [AppComponent]
})
export class PresenceModule { }
