import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Promo } from '../shared/promo.model';
import { PromoService } from '../shared/promo.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPromoDisableDialogComponent } from '../confirm-promo-disable-dialog/confirm-promo-disable-dialog.component';
import { PromoModifyDialogComponent } from '../promo-modify-dialog/promo-modify-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';

@Component({
    selector: 'app-promo-list',
    templateUrl: './promo-list.component.html',
    styleUrls: ['./promo-list.component.scss'],
})
export class PromoListComponent {
    displayedColumns: string[] = ['libelle', 'date_debut', 'date_fin_prevue'];
    dataSource = new MatTableDataSource<Promo>([]);
    imgPromos: any = 'assets/img/service.png';
    selection = new SelectionModel<Promo>(true, []);
    isSuperAdmin = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        public themeService: CustomizerSettingsService,
        private promoService: PromoService,
        public dialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {}

    openConfirmationDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        let modal = this.dialog.open(ConfirmPromoDisableDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.id = id;
    }
    openConfirmationActiveDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        let modal = this.dialog.open(ConfirmPromoDisableDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.id = id;
    }

    openModifyDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        let modal = this.dialog.open(PromoModifyDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.id = id;
    }

    ngOnInit(): void {
        const userRole = this.authService.getConnected().role_id.libelle;
        if (userRole == 'SUPER_ADMIN') {
            this.isSuperAdmin = true;
            this.displayedColumns = [
                'libelle',
                'date_debut',
                'date_fin_prevue',
                'actions',
            ];
        }

        this.promoService.promoUpdate.subscribe(() => {
            this.promoService
                .getPromos()
                .pipe(
                    map((data: any[]) => {
                        const promoElements: Promo[] = [];
                        data.forEach((item) => {
                            const periodicElement: Promo = {
                                id: item.id,
                                libelle: item.libelle,
                                date_debut: item.date_debut,
                                date_fin_prevue: item.date_fin_prevue,
                                date_fin_reel: item.date_fin_reel,
                                is_active: item.is_active,
                                hommes: item.hommes,
                                femmes: item.femmes,
                                is_ongoing: item.is_ongoing,
                            };
                            promoElements.push(periodicElement);
                        });
                        return promoElements;
                    })
                )
                .subscribe((promoElements) => {
                    ELEMENT_DATA = promoElements;
                    this.dataSource.data = ELEMENT_DATA;
                });

            this.dataSource.paginator = this.paginator;
        });
        this.promoService
            .getPromos()
            .pipe(
                map((data: any) => {
                    const promoElements: Promo[] = [];

                    data.data.forEach((item : any) => {

                        const periodicElement: Promo = {
                            id: item.id,
                            libelle: item.libelle,
                            date_debut: item.date_debut,
                            date_fin_prevue: item.date_fin_prevue,
                            date_fin_reel: item.date_fin_reel,
                            is_active: item.is_active,
                            is_ongoing: item.is_ongoing,
                            hommes: item.hommes,
                            femmes: item.femmes,
                        };
                        promoElements.push(periodicElement);
                    });
                    return promoElements;
                })
            )
            .subscribe((promoElements) => {
                ELEMENT_DATA = promoElements;
                this.dataSource.data = ELEMENT_DATA;
            });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    ngAfterViewInit() {
        this.promoService
            .getPromos()
            .pipe(
                map((data: any) => {
                    const promoElements: Promo[] = [];
                    console.log(data);

                    data.data.forEach((item : any) => {
                        const periodicElement: Promo = {
                            id: item.id,
                            libelle: item.libelle,
                            date_debut: item.date_debut,
                            date_fin_prevue: item.date_fin_prevue,
                            date_fin_reel: item.date_fin_reel,
                            is_ongoing: item.is_ongoing,
                            is_active: item.is_active,
                            hommes: item.hommes,
                            femmes: item.femmes,
                        };
                        promoElements.push(periodicElement);
                    });
                    return promoElements;
                })
            )
            .subscribe((promoElements) => {
                ELEMENT_DATA = promoElements;

                this.dataSource.data = ELEMENT_DATA;
            });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Promo): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.libelle + 1
        }`;
    }

    applyFilter(event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (event.key === 'Enter') {
            const filterValue = (event.target as HTMLInputElement).value;
            this.dataSource.filter = filterValue.trim().toLowerCase();
            if (this.dataSource.filteredData.length == 1) {
                const id = this.dataSource.filteredData[0].id;
                const currentUrl = this.router.url;
                const targetUrl = `${currentUrl}/detail/${id}`;
                this.router.navigateByUrl(targetUrl);
            }
        }
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}

let ELEMENT_DATA: Promo[] = [];
