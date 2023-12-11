import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'chart.js';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ApexFill } from 'ng-apexcharts';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { ApprenantService } from '../shared/apprenant.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPromoDisableDialogComponent } from '../confirm-promo-disable-dialog/confirm-promo-disable-dialog.component';
import { ApprenantResetDialogComponent } from '../apprenant-reset-dialog/apprenant-reset-dialog.component';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-apprenant-detail',
  templateUrl: './apprenant-detail.component.html',
  styleUrls: ['./apprenant-detail.component.scss']
})
export class ApprenantDetailComponent {
  displayedColumns: string[] = ['date_absence','justifier','motif'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

    detailImg = "assets/img/detail_app.png";
    apprenantId: number;
    apprenant:any;
    promotion:any;
    referentiel:any
    tabDivInputs: string[] = [];
    apprenantForm!: FormGroup;
    absence:any
    isSuperAdmin=false

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    successAlert(description:string) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: description,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
    wrongAlert(description:string) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: description,
        })
    }
    
    constructor(
      private _liveAnnouncer: LiveAnnouncer,
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,
        private apprenantService: ApprenantService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private authService: AuthService,



    ){}

    submitted = false;
    
    ngOnInit(): void {
      const userRole = this.authService.getConnected().role_id.libelle;
      if(userRole=="SUPER_ADMIN"){
        this.isSuperAdmin=true;
        
      }
      this.apprenantService.apprenantUpdate.subscribe(() => {
        this.apprenantService.getApprenant(this.apprenantId).subscribe(
              data=>{
              
                this.apprenant=data.apprenant
                this.promotion=data.promoReferentiel.promo
                this.referentiel=data.promoReferentiel.referentiel
                this.apprenantForm = this.formBuilder.group({
                  nom: [this.apprenant.nom, [Validators.required, Validators.maxLength(255)]],
                  prenom: [this.apprenant.prenom, [Validators.required, Validators.maxLength(255)]],
                  email: [this.apprenant.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
                  date_naissance: [this.apprenant.date_naissance, [Validators.required]],
                  lieu_naissance: [this.apprenant.lieu_naissance, [Validators.maxLength(255)]],
                  telephone: [this.apprenant.telephone, [Validators.required, Validators.pattern(/^([0-9\s\-\+\(\)]*)$/), Validators.maxLength(255)]],
                  genre: [this.apprenant.genre],
                  cni: [this.apprenant.cni, [Validators.required, Validators.pattern(/^([0-9]*)$/), Validators.maxLength(255)]], 
        
                });
              }
            );
      });
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.route.params.subscribe(params => {
            this.apprenantId = +params['apprenant'];
            this.getApprenantId(this.apprenantId)
        });

        this.apprenantService.getApprenant(this.apprenantId).pipe(
          map((data: any) => {


            this.absence=data.apprenantAbsence
              const absenceElements: any[] = [];
              data.apprenantAbsence.forEach((item: any) => {
                  const periodicElement: any = {
                      id: item.id,
                      date_absence: item.date_absence,
                      justifier: item.justifier,
                      motif: item.motif,

                  };
                  absenceElements.push(periodicElement);
              });
              return absenceElements;
          })
      ).subscribe(absenceElements => {
          ELEMENT_DATA = absenceElements;
          this.dataSource.data = ELEMENT_DATA;
      });

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

        this.getApprenantId(this.apprenantId)

    }

    ngAfterViewInit() {
      
      
     
        this.apprenantService.getApprenant(this.apprenantId).pipe(
          map((data: any) => {


            this.absence=data.apprenantAbsence
              const absenceElements: any[] = [];
              data.apprenantAbsence.forEach((item: any) => {
                  const periodicElement: any = {
                      id: item.id,
                      date_absence: item.date_absence,
                      justifier: item.justifier,
                      motif: item.motif,

                  };
                  absenceElements.push(periodicElement);
              });
              return absenceElements;
          })
      ).subscribe(absenceElements => {
          ELEMENT_DATA = absenceElements;
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator;
      });


      this.dataSource.paginator = this.paginator;
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    }
    
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

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
toggleAllRows() {
  if (this.isAllSelected()) {
      this.selection.clear();
      return;
  }
  this.selection.select(...this.dataSource.data);
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.justifier + 1}`;
}

    getApprenantId(id:number){
        if (id) {
            this.apprenantService.getApprenant(id).subscribe(
              data=>{
              
                this.apprenant=data.apprenant
                this.promotion=data.promoReferentiel.promo
                this.referentiel=data.promoReferentiel.referentiel
                this.apprenantForm = this.formBuilder.group({
                  nom: [this.apprenant.nom, [Validators.required, Validators.maxLength(255)]],
                  prenom: [this.apprenant.prenom, [Validators.required, Validators.maxLength(255)]],
                  email: [this.apprenant.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
                  date_naissance: [this.apprenant.date_naissance, [Validators.required]],
                  lieu_naissance: [this.apprenant.lieu_naissance, [Validators.maxLength(255)]],
                  telephone: [this.apprenant.telephone, [Validators.required, Validators.pattern(/^([0-9\s\-\+\(\)]*)$/), Validators.maxLength(255)]],
                  genre: [this.apprenant.genre],
                  cni: [this.apprenant.cni, [Validators.required, Validators.pattern(/^([0-9]*)$/), Validators.maxLength(255)]], 
        
                });
              }
            );
        }
    }
    addInputDiv(div: HTMLElement) {
        this.pushToTab(this.tabDivInputs)
      }

      pushToTab(tab: any[]) {
        let element = 'reserve' + (this.tabDivInputs.length + this.tabDivInputs.length + 1)
        while (this.tabDivInputs.indexOf(element) != -1 || this.tabDivInputs.indexOf(element) != -1) {
          element += 'a';
        }
        tab.push(element)
        this.apprenantForm.addControl(tab[tab.indexOf(element)], new FormControl('', Validators.required))
      }

      removeInputDiv(event: any, tab: string[], element: string) {
        tab.splice(tab.indexOf(element), 1);
        this.apprenantForm.removeControl(element)
      }
      get form() {
        return this.apprenantForm.controls ;
      }
      modifyApprenant(apprenant: any){
    
        if (this.apprenantForm.valid) {
          
          
            apprenant.nom= this.apprenantForm.get('nom')?.value,
            apprenant.prenom= this.apprenantForm.get('prenom')?.value,
            apprenant.cni= this.apprenantForm.get('cni')?.value,
            apprenant.email= this.apprenantForm.get('email')?.value,
            apprenant.date_naissance= new Date(this.apprenantForm.get('date_naissance')?.value).toISOString().substring(0, 10).replace(/-/g, '/'),
            apprenant.lieu_naissance= this.apprenantForm.get('lieu_naissance')?.value,
            apprenant.genre= this.apprenantForm.get('genre')?.value,
            apprenant.telephone= this.apprenantForm.get('telephone')?.value
          this.apprenantService.modificationApprenant(apprenant).subscribe({
            next: data => {
              this.successAlert('Apprenant modifier avec succès.');
              this.apprenantService.apprenantUpdate.emit();
            },
            error: error => {
              console.log(error);
              this.wrongAlert('Erreur lors de la modification de l\'apprenant.');
            }
          });
          
        }
        
        this.submitted = true
        
    
      }

      
      openConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string,id: number): void {
        let modal =this.dialog.open(ApprenantResetDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration
        });
        modal.componentInstance.id=id;
        
    }

}
let ELEMENT_DATA: any[] = []