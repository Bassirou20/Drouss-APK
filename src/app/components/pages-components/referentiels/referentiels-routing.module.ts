import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferentielListComponent } from './referentiel-list/referentiel-list.component';
import { RoleGuard } from '../../core/guards/role.guard';
const routes: Routes = [
    {
      path: '',
      component: ReferentielListComponent ,
      canActivate: [RoleGuard],
      data: { roles: ['SUPER_ADMIN','ADMINISTRATEUR'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferentielsRoutingModule { }
