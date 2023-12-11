
import { PresenceService } from '../../presence/shared/presence.service';
import { Presence,Apprenant } from '../../presence/shared/presence.model';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { PromoService } from '../shared/promo.service';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe } from '@angular/common';
import { Referentiel } from '../../referentiels/services/referentiel.model';


@Component({
  selector: 'app-page-presence',
  templateUrl: './page-presence.component.html',
  styleUrls: ['./page-presence.component.scss'],
  providers: [DatePipe]
})
export class PagePresenceComponent {
  @Input() date: string;

  presences: Presence[] = [];
  promo: any;
  ref: any;
  apprenants: Apprenant[] = [];
  apprenantsPresentRef: Presence[] = [];
  selectedDate: any;
  classeRefLibelle: string;
  MyDate: Date = new Date();

  constructor(
    private presenceservices : PresenceService,
    private route: ActivatedRoute,
    private promoservice: PromoService,
  ){
  }
  ngOnInit() {
  this.route.params.subscribe((params: Params) => {
    console.log(params['promo']);

    this.promo = params['promo'];
    this.ref = params['ref'];
    this.getPresences();
    this.getApprenants();
     this.getClasseRefDetails(this.promo, this.ref);
  });
}


getPresences() {
  const dateParam = this.selectedDate ? this.selectedDate : '';
  this.presenceservices.getPresences(dateParam).subscribe({
    next: data => {
      this.presences = data;
      console.log('presence',data);
      this.compareApprenants();
    },
    error: error => {
      console.log(error);
    }
  });
}

getClasseRefDetails(promoId: number, refId: number) {
    console.log(promoId,refId);

    this.promoservice.getClasseRefDetails(promoId, refId).subscribe({
      next: data => {
        this.classeRefLibelle = data.libelle; // Stockez le libellé de la classe référentielle
      },
      error: error => {
        console.error('Erreur lors de la récupération des détails de la classe référentielle:', error);
      }
    });
  }

getApprenants() {
  const dateParam = '';
  console.log(this.promo,this.ref);

  this.promoservice.getPromosRefApp(this.promo, this.ref).subscribe({
    next: data => {
      this.apprenants = data.apprenants.data;
      console.log('h',data.apprenants.data);

      this.compareApprenants();
    },
    error: error => {
      console.log(error);
    }
  });
}

compareApprenants() {
  this.apprenantsPresentRef = this.presences
    .filter(presence =>
      presence.apprenants.some(apprenant =>
        this.apprenants.some(apprenantRef =>
          apprenantRef.matricule === apprenant.apprenant.matricule
        )
      )
    )
    .map(presence => {
      const apprenantsPresence = presence.apprenants
        .filter(apprenant =>
          this.apprenants.some(apprenantRef =>
            apprenantRef.matricule === apprenant.apprenant.matricule
          )
        );

      return {
        ...presence,
        apprenants: apprenantsPresence
      };
    });
}

onDateSelect(event: any) {
  const selectedDate = event.target.value;
  const year = new Date(selectedDate).getFullYear();
  const month = String(new Date(selectedDate).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(selectedDate).getDate()).padStart(2, '0');
  this.selectedDate = `${year}-${month}-${day}`;
  console.log('date', this.selectedDate);
  this.getPresences();
}




isLate(dateHeureArriver: string): boolean {
  const heureArriver = new Date(dateHeureArriver).getTime();
  const heureLimite = new Date(dateHeureArriver.slice(0, 11) + '08:00').getTime();
  return heureArriver > heureLimite;
}
exportToExcel() {

    const sheetName = 'ListeDePresence';

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.presences, {
      header: ['Matricule', 'Nom', 'Prénom', 'Heure d\'arrivée'], // Noms des colonnes
      skipHeader: false, // Afficher ou masquer la ligne d'en-tête
    });


    const workbook: XLSX.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, `ListeDePresence_${this.date}.xlsx`);
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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




exportAllToPDF(container: HTMLElement) {
    const currentDate = new Date().toLocaleDateString();
    console.log(this.ref);


    this.getBase64ImageFromURL('../../../../../assets/img/logo_sa.png')
        .then((base64Image) => {
            const docDefinition: any = {
                header: {
                    columns: [
                        {
                            image: base64Image,
                            width: 80,
                            alignment: 'left',
                            margin: [0, 2, -9, 8],
                        },
                        {
                            text: `Liste de présence:${this.ref}`,
                            style: 'header',
                            alignment: 'center',
                            margin: [0, 10, 0, 10],

                        },
                        {
                            text: `Date : ${this.selectedDate ? new Date(this.selectedDate).toDateString() : 'Non sélectionnée'}`,
                            style: 'subheader',
                            alignment: 'right',
                            margin: [0, 10, 0, 10],
                        },
                    ],
                },
                content: [
                    {
                        table: {
                            headerRows: 1,
                            widths: [80, 130, 160, 90],
                            body: this.getTableData(container),
                        },
                        style: 'tableStyle',
                    },
                ],
                styles: {
                    header: {
                        fontSize: 24,
                        bold: true,
                        margin: [0, 0, 0, 10],
                        color: 'black',
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 0, 0, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 12,
                        color: 'black',
                        fillColor: '#CCCCCC',
                    },
                    tableCell: {
                        fontSize: 12,
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
private getTableData(table: HTMLElement): any[] {
    const datas: any[] = [];

    const headers = Array.from(table.querySelectorAll('th')).map((header) => ({
        text: header.textContent?.trim() ?? '',
        style: 'tableHeader',
    }));

    datas.push(headers);

    const rows = Array.from(table.querySelectorAll('tr')).slice(1);
    rows.forEach((row) => {
        const rowData = Array.from(row.querySelectorAll('td')).map((cell) => ({
            text: cell.textContent?.trim() ?? '',
            style: 'tableCell',
        }));

        datas.push(rowData);
    });

    return datas;
}

reloadPage() {
    window.location.reload();
 }
}
