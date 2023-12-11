import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  { 
    path: '',
    component: UsersListComponent,
    canActivate: [RoleGuard], 
    data: { roles: ['SUPER_ADMIN'] }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
