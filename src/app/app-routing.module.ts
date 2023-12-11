import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutsComponent } from './components/layouts/layouts.component';
import { NotFoundComponent } from './components/layouts/not-found/not-found.component';
import { AuthGuard } from './components/core/guards/auth.guard';
import { PromoReferencielDetailComponent } from './components/pages-components/promos/promo-referenciel-detail/promo-referenciel-detail.component';

const routes: Routes = [
    // Here add new pages component

    {
        path: 'promos/detail/:promo/:ref',
        component: PromoReferencielDetailComponent,
    },

    {
        path: '',
        loadChildren: () =>
            import('./components/authentication/authentication.module').then(
                (m) => m.AuthenticationModule
            ),
    },
    {
        path: 'pages',
        component: LayoutsComponent,
        loadChildren: () =>
            import('./components/pages-components/pages.module').then(
                (m) => m.PagesModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'account',
        loadChildren: () =>
            import('./components/authentication/authentication.module').then(
                (m) => m.AuthenticationModule
            ),
    },
    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
