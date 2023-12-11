import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersListComponent,
    UserInfoComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class UtilisateursModule { }
