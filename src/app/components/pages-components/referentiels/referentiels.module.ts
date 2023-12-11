import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferentielsRoutingModule } from './referentiels-routing.module';
import { ReferentielListComponent } from './referentiel-list/referentiel-list.component';
import { ReferentielCardComponent } from './referentiel-card/referentiel-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ReferentielAddDialogComponent } from './referentiel-add-dialog/referentiel-add-dialog.component';
import { ReferentielModDialogComponent } from './referentiel-mod-dialog/referentiel-mod-dialog.component';
import { AppComponent } from '../../../app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ReferentielListComponent,
    ReferentielCardComponent,
    ReferentielModDialogComponent

  ],
  imports: [
    CommonModule,
    ReferentielsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class ReferentielsModule { }
