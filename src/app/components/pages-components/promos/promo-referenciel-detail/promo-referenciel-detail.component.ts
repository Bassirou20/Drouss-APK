import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { Apprenant } from '../shared/apprenant.model';
import { PromoService } from '../shared/promo.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Promo } from '../shared/promo.model';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { MatDialog } from '@angular/material/dialog';
import {
    ApprenantAddDialogComponent,
    ApprenantAddExcelComponent,
} from '../apprenant-add-dialog/apprenant-add-dialog.component';
import { ApprenantService } from '../shared/apprenant.service';

import Swal from 'sweetalert2';
import { ConfirmDisableDialogComponent } from '../confirm-disable-dialog/confirm-disable-dialog.component';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
import { ConfirmEnableDialogComponent } from '../confirm-enable-dialog/confirm-enable-dialog.component';
// import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import  'jspdf-autotable';
// import { UserOptions } from 'jspdf-autotable';

// interface jsPDFWithAutoTable extends jsPDF {
//     autoTable: (options: any) => jsPDF;
//   }

@Component({
    selector: 'app-promo-referenciel-detail',
    templateUrl: './promo-referenciel-detail.component.html',
    styleUrls: ['./promo-referenciel-detail.component.scss'],
    providers: [ConfirmDisableDialogComponent],
})
export class PromoReferencielDetailComponent {
    @ViewChild('table', { static: false }) table: ElementRef;

    displayedColumns: string[] = [
        'image',
        'nom',
        'prenom',
        'email',
        'genre',
        'telephone',
        'actions',
    ];
    dataSource = new MatTableDataSource<Apprenant>([]);
    selection = new SelectionModel<Apprenant>(true, []);
    refId: any;
    promo: number = 0;
    ref: number = 0;
    imgUser: any = 'assets/img/apprenant.jpg';
    promotion!: Promo;

    referentiel!: Referentiel;
    apprenant!: any;

    isSuperAdmin = false;

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    successAlert(description: string) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: description,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    wrongAlert(description: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: description,
        });
    }
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        public themeService: CustomizerSettingsService,
        private promoService: PromoService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public apprenantServices: ApprenantService,
        private router: Router,
        private authService: AuthService
    ) {}

    openConfirmationDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        id: number
    ): void {
        let modal = this.dialog.open(ConfirmDisableDialogComponent, {
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
        let modal = this.dialog.open(ConfirmEnableDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.id = id;
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
        const userRole = this.authService.getConnected().role_id.libelle;
        if (userRole == 'SUPER_ADMIN') {
            this.isSuperAdmin = true;
        }
        this.apprenantServices.apprenantUpdate.subscribe(() => {
            this.promoService
                .getPromosRefApp(this.promo, this.ref)
                .pipe(
                    map((data: any) => {
                        this.promotion = data.promo;

                        this.referentiel = data.referentiel;
                        this.apprenant = data.apprenants.data;
                        const promoElements: Apprenant[] = [];
                        data.apprenants.data.forEach((item: Apprenant) => {
                            const periodicElement: Apprenant = {
                                id: item.id,
                                nom: item.nom,
                                prenom: item.prenom,
                                email: item.email,
                                date_naissance: item.date_naissance,
                                lieu_naissance: item.lieu_naissance,
                                genre: item.genre,
                                telephone: item.telephone,
                                photo: item.photo,
                                is_active: item.is_active,
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
            this.dataSource.paginator = this.paginator;
        });
        this.route.params.subscribe((params) => {
            this.promo = params['id'];
            this.ref = params['refId'];
            this.apprenantServices.promoSubject = this.promo;
            this.apprenantServices.refSubject = this.ref;
        });

        this.promoService
            .getPromosRefApp(this.promo, this.ref)
            .pipe(
                map((data: any) => {
                    this.promotion = data.promo;

                    this.referentiel = data.referentiel;
                    this.apprenant = data.apprenants.data;

                    const promoElements: Apprenant[] = [];
                    data.apprenants.data.forEach((item: Apprenant) => {
                        const periodicElement: Apprenant = {
                            id: item.id,
                            nom: item.nom,
                            prenom: item.prenom,
                            email: item.email,
                            date_naissance: item.date_naissance,
                            lieu_naissance: item.lieu_naissance,
                            genre: item.genre,
                            telephone: item.telephone,
                            photo: item.photo,
                            is_active: item.is_active,
                        };
                        promoElements.push(periodicElement);
                    });
                    return promoElements;
                })
            )
            .subscribe((promoElements) => {
                ELEMENT_DATA = promoElements;
                this.dataSource.data = ELEMENT_DATA;
                this.dataSource.paginator = this.paginator;
            });

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.route.params.subscribe((params: Params) => {
            // this.promo = params['promo'];
            this.refId = params['ref'];
        });
    }

    createImageUrl(blobData: any): any {
        const blob = new Blob([blobData], { type: 'image/jpg' });
        let objectURL = URL.createObjectURL(blobData);
        console.log(objectURL);
        return objectURL;
    }

    ngAfterViewInit() {
        this.promoService
            .getPromosRefApp(this.promo, this.ref)
            .pipe(
                map((data: any) => {
                    this.promotion = data.promo;

                    this.referentiel = data.referentiel;
                    const promoElements: Apprenant[] = [];
                    data.apprenants.data.forEach((item: Apprenant) => {
                        const periodicElement: Apprenant = {
                            id: item.id,
                            matricule: item.matricule,
                            nom: item.nom,
                            prenom: item.prenom,
                            email: item.email,
                            date_naissance: item.date_naissance,
                            lieu_naissance: item.lieu_naissance,
                            genre: item.genre,
                            telephone: item.telephone,
                            photo: item.photo,
                            is_active: item.is_active,
                        };
                        promoElements.push(periodicElement);
                    });
                    return promoElements;
                })
            )
            .subscribe((promoElements) => {
                ELEMENT_DATA = promoElements;
                this.dataSource.data = ELEMENT_DATA;
                this.dataSource.paginator = this.paginator;
            });

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.generatePDF();
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
    checkboxLabel(row?: Apprenant): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.nom + 1
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
                const targetUrl = `${currentUrl}/${id}`;
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

    openCreateUserDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        let modal = this.dialog.open(ApprenantAddDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.promotion = this.promo;
        modal.componentInstance.referentiel = this.ref;
    }

    openCreateApprenantExcel(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ) {
        let modal = this.dialog.open(ApprenantAddExcelComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        modal.componentInstance.promo_id = this.promo;
        modal.componentInstance.ref_id = this.ref;
    }
    onPresenceListClick() {
        console.log(this.promo,this.ref);

        // this.router.navigate(['presences', { promo: this.promo, ref: this.ref }]);
        this.router.navigate([
            '/pages/promos/presences',
            { promo: this.promo, ref: this.ref },
        ]);
    }

    private getBase64ImageFromURL(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(img, 0, 0);

                    const dataURL = canvas.toDataURL('image/png');

                    resolve(dataURL);
                } else {
                    reject(new Error('Unable to get 2D context from canvas.'));
                }
            };

            img.onerror = (error) => {
                reject(error);
            };

            img.src = url;
        });
    }

    exportAllToPDF() {
        const allData = this.dataSource.data;

        const currentDate = new Date().toLocaleDateString();

        // Obtenez l'image en tant que base64
        this.getBase64ImageFromURL('../../../../../assets/img/logo_sa.png')
            .then((base64Image) => {
                const docDefinition: any = {
                    header: {
                        columns: [
                            {
                                image: base64Image,
                                width: 80,
                                alignment: 'center',
                                margin: [0, 2, -9, 8], // Marge en haut et en bas du logo
                            },
                        ],
                    },
                    content: [
                        {
                            text: currentDate,
                            alignment: 'right',
                            margin: [0, 10, 0, 10], // Marge en haut et en bas de la date
                        },
                        {
                            text: 'Référentiel: ' + this.referentiel.libelle,
                            alignment: 'right',
                            margin: [0, 10, 0, 10], // Marge en haut et en bas du référentiel
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [100, 150, 180, 50, 50, 50],
                                body: this.getTableData(allData),
                            },
                            style: 'tableStyle',
                        },
                    ],
                    styles: {
                        tableStyle: {
                            margin: [6, 6, 6, 6],
                        },
                        tableHeader: {
                            fillColor: '#CCCCCC',
                            bold: true,
                            fontSize: 12,
                            color: 'black',
                        },
                        tableCell: {
                            fontSize: 10,
                            color: 'black',
                        },
                    },
                };

                pdfMake.createPdf(docDefinition).download('pdf-export.pdf');
            })
            .catch((error) => {
                console.error(error);
            });
    }
    private getTableData(data: any[]): any[] {
        const tableDatas: any[] = [];

        const headers = this.displayedColumns
            .filter(
                (column) =>
                    column !== 'image' &&
                    column !== 'actions' &&
                    column !== 'telephone'
            )
            .map((column) => ({
                text: column,
                style: 'tableHeader',
            }));

        tableDatas.push(headers);

        data.forEach((row) => {
            const rowData = this.displayedColumns
                .filter(
                    (column) =>
                        column !== 'image' &&
                        column !== 'actions' &&
                        column !== 'telephone'
                )
                .map((column) => ({
                    text: row[column].toString(),
                    style: 'tableCell',
                }));

            tableDatas.push(rowData);
        });

        return tableDatas;
    }
}

let ELEMENT_DATA: Apprenant[] = [];
