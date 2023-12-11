import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PromosRoutingModule } from './promos-routing.module';
import { PromoListComponent } from './promo-list/promo-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PromoCreateComponent } from './promo-create/promo-create.component';
import { PromoDetailComponent } from './promo-detail/promo-detail.component';
import { PromoReferencielDetailComponent } from './promo-referenciel-detail/promo-referenciel-detail.component';
import { ApprenantAddDialogComponent, ApprenantAddExcelComponent } from './apprenant-add-dialog/apprenant-add-dialog.component';
import { PromoDashboardComponent } from './promo-dashboard/promo-dashboard.component';
import { ApprenantDetailComponent } from './apprenant-detail/apprenant-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApprenantsInactifComponent } from './apprenants-inactif/apprenants-inactif.component';
import { ConfirmEnableDialogComponent } from './confirm-enable-dialog/confirm-enable-dialog.component';
import { ConfirmPromoDisableDialogComponent } from './confirm-promo-disable-dialog/confirm-promo-disable-dialog.component';
import { PromoModifyDialogComponent } from './promo-modify-dialog/promo-modify-dialog.component';
import { ApprenantResetDialogComponent } from './apprenant-reset-dialog/apprenant-reset-dialog.component';
import { AppComponent } from '../../../app.component';
import { PagePresenceComponent } from './page-presence/page-presence.component';
import { ApprenantsAbsencesComponent } from './apprenants-absences/apprenants-absences.component';
import { JustifierAbsenceDialogComponent } from './justifier-absence-dialog/justifier-absence-dialog.component';
import { AddEntrepriseDialogBox, PromoEntrepriseComponent } from './promo-entreprise/promo-entreprise.component';
import { PromoReferentielEmploieDuTempsComponent } from './promo-referentiel-emploie-du-temps/promo-referentiel-emploie-du-temps.component';
import { AddEmploieDuTempsComponent } from './promo-referentiel-emploie-du-temps/add-emploie-du-temps/add-emploie-du-temps.component';

@NgModule({
  declarations: [
    PromoListComponent,
    PromoCreateComponent,
    PromoDetailComponent,
    PromoReferencielDetailComponent,
    ApprenantAddDialogComponent,
    PromoDashboardComponent,
    ApprenantAddExcelComponent,
    ApprenantDetailComponent,
    ApprenantsInactifComponent,
    ConfirmEnableDialogComponent,
    ConfirmPromoDisableDialogComponent,
    PromoModifyDialogComponent,
    ApprenantResetDialogComponent,
    PagePresenceComponent,
    ApprenantsAbsencesComponent,
    JustifierAbsenceDialogComponent,
    PromoEntrepriseComponent,
    AddEntrepriseDialogBox,
    PromoReferentielEmploieDuTempsComponent,
    AddEmploieDuTempsComponent
  ],
  imports: [
    CommonModule,
    PromosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]

})
export class PromosModule { }
