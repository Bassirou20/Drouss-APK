import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    FormsModule,
    ReactiveFormsModule
  ]


})
export class PagesModule { }
