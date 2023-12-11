import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertionListComponent } from './insertion-list/insertion-list.component';
import { InsertionDetailComponent } from './insertion-detail/insertion-detail.component';

const routes: Routes = [
    { path: '' , component: InsertionListComponent},
    { path: 'detail/:id' , component: InsertionDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertionRoutingModule { }
