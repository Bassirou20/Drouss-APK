import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import Swal from 'sweetalert2';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { Apprenant } from '../shared/apprenant.model';
import { ApprenantService } from '../shared/apprenant.service';
import { Promo } from '../shared/promo.model';
import { PromoService } from '../shared/promo.service';
import { Location } from '@angular/common'
import { ConfirmEnableDialogComponent } from '../confirm-enable-dialog/confirm-enable-dialog.component';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
@Component({
  selector: 'app-apprenants-inactif',
  templateUrl: './apprenants-inactif.component.html',
  styleUrls: ['./apprenants-inactif.component.scss']
})
export class ApprenantsInactifComponent {
  displayedColumns: string[] = ['image', 'nom', 'prenom', 'email', 'genre', 'telephone', 'actions'];
  dataSource = new MatTableDataSource<Apprenant>([]);
  selection = new SelectionModel<Apprenant>(true, []);
  refId: any;
  promo: number = 0;
  ref: number = 0;
  imgUser: any = "assets/img/apprenant.jpg";
  promotion!: Promo;
  referentiel!: Referentiel
  apprenant!:any;
number: number=1
isSuperAdmin=false

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
  }
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
      private promoService: PromoService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      public apprenantServices: ApprenantService,
      private location: Location,
      private authService: AuthService,
      private router:Router,

  ) { }

  openConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string,id: number): void {
      let modal =this.dialog.open(ConfirmEnableDialogComponent, {
          width: '1200px',
          enterAnimationDuration,
          exitAnimationDuration
      });
      modal.componentInstance.id=id;
      
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    const userRole = this.authService.getConnected().role_id.libelle;
    if(userRole=="SUPER_ADMIN"){
        this.isSuperAdmin=true;
      }
      this.apprenantServices.apprenantUpdate.subscribe(() => {
        this.promoService.getInactifApp(this.promo, this.ref).pipe(
            map((data: any) => {
                
                
                this.promotion = data.promo
                
                this.referentiel = data.referentiel
                this.apprenant=data.apprenants.data
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

                    };
                    promoElements.push(periodicElement);
                });
                return promoElements;
            })
        ).subscribe(promoElements => {
            ELEMENT_DATA = promoElements;
            this.dataSource.data = ELEMENT_DATA;
        });
  
        this.dataSource.paginator = this.paginator;
  
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        });
      this.route.params.subscribe(params => {
          this.promo = params['id'];
          this.ref = params['refId'];
          this.apprenantServices.promoSubject=this.promo;
          this.apprenantServices.refSubject=this.ref;
      });
      

      this.promoService.getInactifApp(this.promo, this.ref).pipe(
          map((data: any) => {
              
              
              this.promotion = data.promo
              
              this.referentiel = data.referentiel
              this.apprenant=data.apprenants.data
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

                  };
                  promoElements.push(periodicElement);
              });
              return promoElements;
          })
      ).subscribe(promoElements => {
          ELEMENT_DATA = promoElements;
          this.dataSource.data = ELEMENT_DATA;
      });

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

  }
  
  createImageUrl(blobData: any): any {
      const blob = new Blob([blobData], { type: 'image/jpg' });
      let objectURL = URL.createObjectURL(blobData);       
      console.log(objectURL)
      return objectURL;
    }

    goBackToPrevPage(): void {
      this.location.back();
    }
  ngAfterViewInit() {

      this.promoService.getInactifApp(this.promo, this.ref).pipe(
          map((data: any) => {
              this.promotion = data.promo
              
              this.referentiel = data.referentiel
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

                  };
                  promoElements.push(periodicElement);
              });
              return promoElements;
          })
      ).subscribe(promoElements => {
          ELEMENT_DATA = promoElements;
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator;

      });

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom + 1}`;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (event.key === 'Enter') {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if(this.dataSource.filteredData.length==1){
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




 

  
}

let ELEMENT_DATA: Apprenant[] = []