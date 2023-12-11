import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApprenantDetailComponent } from './promos/apprenant-detail/apprenant-detail.component';
import { PromoReferencielDetailComponent } from './promos/promo-referenciel-detail/promo-referenciel-detail.component';
const routes: Routes = [
  { path: '' , component: DashboardComponent},
  { path: 'referentiels', loadChildren: () => import('./referentiels/referentiels.module').then(m => m.ReferentielsModule) },
  { path: 'promos', loadChildren: () => import('./promos/promos.module').then(m => m.PromosModule) },
  { path: 'visiteurs', loadChildren: () => import('./visiteurs/visiteurs.module').then(m => m.VisiteursModule) },
  { path: 'events', loadChildren: () => import('./evenement/evenement.module').then(m => m.EvenementModule) },
  { path: 'insertions', loadChildren: () => import('./insertion/insertion.module').then(m => m.InsertionModule) },
  { path: 'presence', loadChildren: () => import('./presence/presence.module').then(m => m.PresenceModule) },
  { path: 'utilisateurs', loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
  { path: 'profile', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },

  { path: 'detail/apprenant/:apprenant',component: ApprenantDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
