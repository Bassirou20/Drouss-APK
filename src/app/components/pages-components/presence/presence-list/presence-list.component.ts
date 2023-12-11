import { PresenceService } from '../shared/presence.service';
import { Presence } from '../shared/presence.model';
import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import domToImage from 'dom-to-image';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { map } from 'rxjs';
import { TDocumentDefinitions, TDocumentInformation } from 'pdfmake/interfaces';
import * as fs from 'fs';
import * as path from 'path';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
    selector: 'app-presence-list',
    templateUrl: './presence-list.component.html',
    styleUrls: ['./presence-list.component.scss'],
})
export class PresenceListComponent {
    @Input() date: string;
    presences: Presence[] = [];
    apprenantsPresent: number = 0;
    PresenceRef: any[] = [];
    dataSource = new MatTableDataSource<any>([]);
    pageSize = 2;
    pageIndex = 0;
    pageSizeOptions = [2, 5, 10, 20];
    filterValue: string;
    displayedColumns: string[] = [
        'matricule',
        'nom',
        'prenom',
        'referentiel_libelle',
        'date_heure_arriver',
    ];
    private ELEMENT_DATA: any[] = [];
    selectedReferentiel: string;
    originalData: any[] = [];
    pdfName: string = '';

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    router: any;
    @ViewChild('dataToExport', { static: false })
    public dataToExport: ElementRef;

    constructor(
        private presenceservices: PresenceService,
        public themeService: CustomizerSettingsService
    ) {
        this.dataSource = new MatTableDataSource<any>();
    }
    ngOnInit() {
        this.PresenceRef;
        // this.getPresences();
        // console.log(this.PresenceRef);

        console.log('count');

        this.presenceservices
            .getPresenceswithref()
            .pipe(
                map((data: any) => {
                    const promoElements: any[] = [];

                    data.forEach((item: any) => {
                        const periodicElement: any = {
                            id: item.id,
                            matricule: item.matricule,
                            nom: item.nom,
                            prenom: item.prenom,
                            email: item.email,
                            password: item.password,
                            date_naissance: item.date_naissance,
                            lieu_naissance: item.lieu_naissance,
                            genre: item.genre,
                            motif: item.motif,
                            reserves: item.reserves,
                            telephone: item.telephone,
                            photo: item.photo,
                            user_id: item.user.id,
                            created_at: item.lieu_naissance,
                            updated_at: item.lieu_naissance,
                            referentiel_libelle: item.referentiel_libelle,
                        };
                        promoElements.push(periodicElement);
                    });
                    return promoElements;
                })
            )
            .subscribe((promoElements) => {
                this.ELEMENT_DATA = promoElements; // Utiliser this.ELEMENT_DATA au lieu de ELEMENT_DATA
                this.dataSource.data = this.ELEMENT_DATA;
            });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.fetchData();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['date'] && !changes['date'].firstChange) {
            this.fetchData();
        }
    }

    getPresenceswithref() {
        const dateParam = this.date ? this.date : '';
        this.presenceservices.getPresences(dateParam).subscribe({
            next: (data) => {
                this.PresenceRef = data;
                console.log(this.PresenceRef);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    applyReferentielFilter() {
        if (this.selectedReferentiel) {
            this.dataSource.filter = this.selectedReferentiel;
        } else {
            this.dataSource.filter = '';
        }
    }

    fetchData() {
        const dateParam = this.date ? this.date : '';
        this.presenceservices.getPresenceswithref(dateParam).subscribe({
            next: (data: any[]) => {
                this.dataSource.data = data;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    onPageChange(event: any) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.updateDataSource();
    }

    updateDataSource() {
        let filteredData = this.PresenceRef.filter((item) =>
            Object.values(item).some(
                (prop) =>
                    prop !== null &&
                    prop !== undefined &&
                    prop
                        .toString()
                        .toLowerCase()
                        .includes(this.filterValue.toLowerCase())
            )
        );

        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        this.dataSource.data = paginatedData;
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

    //   getPresences() {
    //     const dateParam = this.date ? this.date : '';
    //     this.presenceservices.getPresences(dateParam).subscribe({
    //       next: data => {
    //         this.presences = data;
    //         this.countApprenantsPresent();
    //         console.log(data);

    //       },
    //       error: error => {
    //         console.log(error);
    //       }
    //     });
    //   }
    //   countApprenantsPresent() {
    //     this.apprenantsPresent = 0; // Réinitialiser le compteur
    //     for (const presence of this.presences) {
    //       this.apprenantsPresent += presence.apprenants.length; // Ajouter le nombre d'apprenants présents dans chaque présence
    //       console.log(presence.apprenants);

    //     }
    //   }
    isLate(dateHeureArriver: string): boolean {
        const heureArriver = new Date(dateHeureArriver).getTime();
        const heureLimite = new Date(
            dateHeureArriver.slice(0, 11) + '08:00'
        ).getTime();
        return heureArriver > heureLimite;
    }






    exportAsPdf() {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        // const logoUrl ='';

        // const canvas = document.createElement('canvas');
        // const context = canvas.getContext('2d');
        // const image = new Image();

        // image.onload = () => {
        //     canvas.width = image.width;
        //     canvas.height = image.height;
        //     context?.drawImage(image, 0, 0);
        //     const imageBase64 = canvas.toDataURL('image/png');
        // }
        const tableData = this.dataSource.data.map((element) => [
            element.matricule,
            element.nom,
            element.prenom,
            element.referentiel_libelle,
            element.date_heure_arriver,
        ]);
        const docDefinition: TDocumentDefinitions = {
            content: [
                // {
                //     image: logoUrl,
                //     width: 100,
                //     alignment: 'center',
                //     margin: [0, 10, 0, 10],
                // },
                { text: 'Liste de présence', style: 'header' },
                { text: `Date: ${this.date}`, style: 'subheader' },
                {
                    text: `Nombre d'apprenants présents: ${this.dataSource.data.length}`,
                    style: 'subheader',
                },
                {
                    table: {
                        headerRows: 1,
                        widths: [60, 80, 140, 90, 110],
                        body: [
                            [
                                { text: 'Matricule', style: 'tableHeader' },
                                { text: 'Nom', style: 'tableHeader' },
                                { text: 'Prénom', style: 'tableHeader' },
                                { text: 'Référentiel', style: 'tableHeader' },
                                {
                                    text: "Heure d'arrivée",
                                    style: 'tableHeader',
                                },
                            ],
                            ...this.dataSource.data.map((apprenant) => [
                                apprenant.matricule,
                                apprenant.nom,
                                apprenant.prenom,
                                apprenant.referentiel_libelle,
                                apprenant.date_heure_arriver,
                            ]),
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    decoration: 'underline',
                    margin: [0, 10, 0, 10] as [number, number, number, number],
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [10, 0, 10, 20] as [number, number, number, number],
                },
                tableHeader: {
                    fillColor: '#CCCCCC',
                    bold: true,
                },
            },
        };

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download('liste_presence.pdf');
    }

}
