import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { PromoService } from '../shared/promo.service';
import { map } from 'rxjs';
import { JustifierAbsenceDialogComponent } from '../justifier-absence-dialog/justifier-absence-dialog.component';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';



@Component({
    selector: 'app-apprenants-absences',
    templateUrl: './apprenants-absences.component.html',
    styleUrls: ['./apprenants-absences.component.scss'],
})
export class ApprenantsAbsencesComponent {
    displayedColumns: string[] = [
        'apprenant',
        'date_absence',
        'justifier',
        'motif',
        'actions',
    ];
    selectedDate: Date;

    dataSource = new MatTableDataSource<any>([]);
    imgPromos: any = 'assets/img/service.png';
    selection = new SelectionModel<any>(true, []);
    isSuperAdmin = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    promo: any;
    ref: any;
    apprenantAbsent: any;
    promotion: any;
    referentiel: any;
    selectType: any;
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
        private router: Router,
        private route: ActivatedRoute
        ) {}
        openModifyDialog(
            enterAnimationDuration: string,
            exitAnimationDuration: string,
            id: number
            ): void {
                let modal = this.dialog.open(JustifierAbsenceDialogComponent, {
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
        }

        this.promoService.promoUpdate.subscribe(() => {
            this.promoService
                .getAbsences(this.promo, this.ref)
                .pipe(
                    map((data: any[]) => {
                        const absencesElements: any[] = [];
                        data.forEach((item) => {
                            const periodicElement: any = {
                                id: item.id,
                                nom: item.apprenant.nom,
                                prenom: item.apprenant.prenom,
                                date_absence: item.date_absence,
                                justifier: item.justifier,
                                motif: item.motif,
                            };
                            absencesElements.push(periodicElement);
                        });
                        return absencesElements;
                    })
                )
                .subscribe((absencesElements) => {
                    ELEMENT_DATA = absencesElements;
                    this.dataSource.data = ELEMENT_DATA;
                });

            this.dataSource.paginator = this.paginator;
        });
        this.route.params.subscribe((params) => {
            this.promo = params['id'];
            this.ref = params['refId'];
        });

        this.promoService
            .getPromosRefApp(this.promo, this.ref)
            .subscribe((data) => {
                this.promotion = data.promo;

                this.referentiel = data.referentiel;
            });
        this.promoService
            .getAbsences(this.promo, this.ref)
            .pipe(
                map((data: any) => {
                    this.apprenantAbsent = data;

                    const absencesElements: any[] = [];
                    data.forEach((item: any) => {
                        const periodicElement: any = {
                            id: item.id,
                            nom: item.apprenant.nom,
                            prenom: item.apprenant.prenom,
                            date_absence: item.date_absence,
                            justifier: item.justifier,
                            motif: item.motif,
                        };
                        absencesElements.push(periodicElement);
                    });
                    return absencesElements;
                })
            )
            .subscribe((absencesElements) => {
                ELEMENT_DATA = absencesElements;
                this.dataSource.data = ELEMENT_DATA;
            });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    ngAfterViewInit() {
        this.promoService
            .getAbsences(this.promo, this.ref)
            .pipe(
                map((data: any[]) => {
                    const absencesElements: any[] = [];
                    data.forEach((item) => {
                        const periodicElement: any = {
                            id: item.id,
                            nom: item.apprenant.nom,
                            prenom: item.apprenant.prenom,
                            date_absence: item.date_absence,
                            justifier: item.justifier,
                            motif: item.motif,
                        };
                        absencesElements.push(periodicElement);
                    });
                    return absencesElements;
                })
            )
            .subscribe((absencesElements) => {
                ELEMENT_DATA = absencesElements;
                this.dataSource.paginator = this.paginator;

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







    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const a: HTMLAnchorElement = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(data);
        a.download = fileName;
        a.click();
        document.body.removeChild(a);
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
        exportAllToPDF(table: HTMLElement) {

            this.getBase64ImageFromURL('../../../../../assets/img/logo_sa.png')
            .then((base64Image) => {
                const docDefinition: any = {
                    header: {
                        // text: 'La Liste des Absents',
                        // style: 'header',

                        columns:[
                            {
                                image: base64Image,
                                width: 80,
                                alignment: 'right',
                                margin: [0, 2, -9, 8],
                            },
                            {
                                text: 'Liste de présence',
                                style: 'header',
                                alignment: 'center',
                                margin: [0, 10, 0, 10],

                            },

                        ]
                    },
                    content: [
                        {
                            text: `Date: ${new Date().toLocaleDateString()}`,
                            alignment: 'right',
                            margin: [0, 10, 0, 10],
                        },
                        {
                            text: `Référentiel: ${this.referentiel.libelle}`,
                            alignment: 'right',
                            margin: [0, 10, 0, 10],
                        },


                        {
                            table: {
                                headerRows: 1,
                                widths:[70,130,140,90],
                                body: this.getTableData(table),
                            },
                            style: 'tableStyle',
                        },
                    ],
                    styles: {
                        // ... (styles existants)
                        header: {
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 10],
                        },
                        subheader: {
                            fontSize: 14,
                            bold: true,
                            margin: [0, 0, 0, 5],
                        },
                        // ... (autres styles existants)
                    },
                };

                pdfMake.createPdf(docDefinition).download('pdf-export.pdf');
            })
            .catch((error) => {
                console.error(error);
            });

        }

        private getTableData(table: HTMLElement): any[] {
            const data: any[] = [];

            const headers = Array.from(table.querySelectorAll('th'))
            .filter((header) => {
                const text = header.textContent?.trim() ?? '';
                return text !== 'Image' && text !== 'Actions';
            })
            .map((header) => ({
                text: header.textContent?.trim() ?? '',
                style: 'tableHeader',
            }));

            data.push(headers);

            const rows = Array.from(table.querySelectorAll('tr')).slice(1);
            rows.forEach((row) => {
            const rowData = Array.from(row.querySelectorAll('td'))
                .filter((cell, index) => {
                return  index !== row.children.length - 1;
                })
                .map((cell, index) => {
                if (index === 1) {
                    return {
                    text: cell.textContent?.trim() ?? '',
                    style: 'tableCell',
                    };
                } else {
                    return {
                    text: cell.textContent?.trim() ?? '',
                    style: 'tableCell',
                    };
                }
                });

            data.push(rowData);
            });

            return data;
        }

    


    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.justifier + 1
        }`;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
    exportToExcel() {
        const data: any[] = this.dataSource.data;
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveExcelFile(excelBuffer, 'absences.xlsx');
    }

    saveExcelFile(buffer: any, fileName: string) {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url: string = window.URL.createObjectURL(data);
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
            link.remove();
        }, 100);
    }
}
let ELEMENT_DATA: any[] = [];
