import { Component } from '@angular/core';
import { VisiteurService } from '../../visiteurs/shared/visiteur.services';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
import { InsertionService } from '../services/insertion.service';

@Component({
    selector: 'app-insertion-list',
    templateUrl: './insertion-list.component.html',
    styleUrls: ['./insertion-list.component.scss']
})
export class InsertionListComponent {

    insertions: any[] = [];
    userRole: boolean;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        public themeService: CustomizerSettingsService,
        private insertionService: InsertionService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public authService: AuthService

    ) { }

    ngOnInit(): void {
        this.getInsertions();
        this.userRole = this.authService.isSuperAdmin();

    }


    toggleTheme() {
        this.themeService.toggleTheme();
    }


    getInsertions() {
        this.insertionService.getInsertions().subscribe({
            next: data => {
                this.insertions = data;
            },
            error: error => {
                console.log(error);
            }
        });
    }
}
