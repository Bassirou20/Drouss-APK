import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRouting } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    CommonModule,
    ProfileRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfilModule { }
