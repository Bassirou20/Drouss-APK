import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceListComponent } from './presence-list/presence-list.component';
import { PresenceDateComponent } from './presence-date/presence-date.component';

const routes: Routes = [
    { path: '', component: PresenceDateComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresenceRoutingModule { }
