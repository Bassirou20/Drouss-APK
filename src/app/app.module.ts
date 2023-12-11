import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { StickyNavModule } from 'ng2-sticky-nav';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatNativeDateModule } from '@angular/material/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { GaugeModule } from 'angular-gauge';
import { NgChartsModule } from 'ng2-charts';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutsModule } from './components/layouts/layouts.module';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { SharedModule } from './components/shared/shared.module';
import { VerticalComponent } from './components/layouts/vertical/vertical.component';
import { AuthInterceptor } from './components/authentication/shared/services/auth.interceptor';

import { ConfirmDisableDialogComponent } from './components/pages-components/promos/confirm-disable-dialog/confirm-disable-dialog.component';
import { PromoreferentielAddDialogComponent } from './components/pages-components/promos/promoreferentiel-add-dialog/promoreferentiel-add-dialog.component';
import { PromoreferentielRemoveDialogComponent } from './components/pages-components/promos/promoreferentiel-remove-dialog/promoreferentiel-remove-dialog.component';








import { ReferentielAddDialogComponent } from './components/pages-components/referentiels/referentiel-add-dialog/referentiel-add-dialog.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WelcomeDashboardComponent } from './components/dashboard/analytics/welcome-dashboard/welcome-dashboard.component';
import { AnalyticsStatusComponent } from './components/dashboard/analytics/analytics-status/analytics-status.component';
import { AnalyticsLanguageComponent } from './components/dashboard/analytics/analytics-language/analytics-language.component';
import { AnalyticsStatsComponent } from './components/dashboard/analytics/analytics-stats/analytics-stats.component';
import { AnalyticsAudienceOverviewComponent } from './components/dashboard/analytics/analytics-audience-overview/analytics-audience-overview.component';
import { SalesAnalyticsComponent } from './components/dashboard/analytics/sales-analytics/sales-analytics.component';
import { RevenueReportComponent } from './components/dashboard/analytics/revenue-report/revenue-report.component';
import { AnalyticsTotalRevenueComponent } from './components/dashboard/analytics/analytics-total-revenue/analytics-total-revenue.component';
import { AnalyticsActivityComponent } from './components/dashboard/analytics/analytics-activity/analytics-activity.component';
import { BrowserUsedTrafficReportsComponent } from './components/dashboard/analytics/browser-used-traffic-reports/browser-used-traffic-reports.component';
import { SessionsByCountriesComponent } from './components/dashboard/analytics/sessions-by-countries/sessions-by-countries.component';
import { TotalTransactionsComponent } from './components/dashboard/analytics/total-transactions/total-transactions.component';
import { NewVsReturingComponent } from './components/dashboard/analytics/new-vs-returing/new-vs-returing.component';
import { AnalyticsGenderComponent } from './components/dashboard/analytics/analytics-gender/analytics-gender.component';
import { VisitorsAgeComponent } from './components/dashboard/analytics/visitors-age/visitors-age.component';
import { SessionsDeviceComponent } from './components/dashboard/analytics/sessions-device/sessions-device.component';
import { TerminalsComponent } from './components/dashboard/analytics/terminals/terminals.component';



@NgModule({
    declarations: [
        AppComponent,
        ConfirmDisableDialogComponent,
        PromoreferentielAddDialogComponent,
        PromoreferentielRemoveDialogComponent,
        ReferentielAddDialogComponent,
        DashboardComponent,
        AnalyticsComponent,
        WelcomeDashboardComponent,
        AnalyticsStatusComponent,
        AnalyticsLanguageComponent,
        AnalyticsStatsComponent,
        AnalyticsAudienceOverviewComponent,
        SalesAnalyticsComponent,
        RevenueReportComponent,
        AnalyticsTotalRevenueComponent,
        AnalyticsActivityComponent,
        BrowserUsedTrafficReportsComponent,
        SessionsByCountriesComponent,
        TotalTransactionsComponent,
        NewVsReturingComponent,
        AnalyticsGenderComponent,
        VisitorsAgeComponent,
        SessionsDeviceComponent,
        TerminalsComponent
    ],
    imports: [
        ReactiveFormsModule,

        LayoutsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        FormsModule,
        FullCalendarModule,
        MatNativeDateModule ,


        HttpClientModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        NgxGaugeModule,
        GaugeModule.forRoot(),

        QuillModule.forRoot(),

        SharedModule,
    ],
    providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: LocationStrategy,useClass : HashLocationStrategy
    }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
