import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CustomizerSettingsComponent } from '../customizer-settings/customizer-settings.component';
import { VerticalComponent } from './vertical/vertical.component';
import { LayoutsComponent } from './layouts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LayoutsComponent,
    VerticalComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    CustomizerSettingsComponent,


  ],
  imports: [
    FormsModule,
    RouterModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule

  ],
  exports: [VerticalComponent]

})
export class LayoutsModule { }
