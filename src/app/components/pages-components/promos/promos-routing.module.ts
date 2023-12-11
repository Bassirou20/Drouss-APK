import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoListComponent } from './promo-list/promo-list.component';
import { PromoCreateComponent } from './promo-create/promo-create.component';
import { PromoDetailComponent } from './promo-detail/promo-detail.component';
import { PromoReferencielDetailComponent } from './promo-referenciel-detail/promo-referenciel-detail.component';
import { ApprenantDetailComponent } from './apprenant-detail/apprenant-detail.component';
import { ApprenantsInactifComponent } from './apprenants-inactif/apprenants-inactif.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { PagePresenceComponent } from './page-presence/page-presence.component';
import { ApprenantsAbsencesComponent } from './apprenants-absences/apprenants-absences.component';

const routes: Routes = [
    { path: '',component: PromoListComponent},
    { path: 'create',component: PromoCreateComponent, canActivate:[RoleGuard], data:{roles:['SUPER_ADMIN']}},
    { path: 'detail/:id/:refId/absences',component: ApprenantsAbsencesComponent},
    { path: 'detail/:id',component: PromoDetailComponent},
    { path: 'detail/:id/:refId',component: PromoReferencielDetailComponent},
    { path: 'detail/:id/:refId/inactif',component: ApprenantsInactifComponent},
    { path: 'presences', component: PagePresenceComponent },
    { path: 'detail/:id/:refId/:apprenant',component: ApprenantDetailComponent},
    { path: 'detail/:id/:refId/inactif/:apprenant',component: ApprenantDetailComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromosRoutingModule { }
