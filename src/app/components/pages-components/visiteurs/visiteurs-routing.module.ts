import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VisiteurListComponent } from './visiteur-list/visiteur-list.component';
import { VisiteurDetailComponent } from './visiteur-detail/visiteur-detail.component';


const routes: Routes = [
    { path: '',component: VisiteurListComponent},
    { path: ':id',component: VisiteurDetailComponent},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class VisiteursRoutingModule { }
