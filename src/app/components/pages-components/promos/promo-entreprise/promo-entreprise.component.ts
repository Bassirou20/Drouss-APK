import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../authentication/shared/services/auth.service';
import { map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Promo } from '../shared/promo.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromoreferentielAddDialogComponent } from '../promoreferentiel-add-dialog/promoreferentiel-add-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsertionService } from '../../insertion/services/insertion.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-promo-entreprise',
  templateUrl: './promo-entreprise.component.html',
  styleUrls: ['./promo-entreprise.component.scss']
})
export class PromoEntrepriseComponent {
    // displayedColumns: string[] = ['Responsable', 'email', 'role', 'status'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


    displayedColumns: string[] = ['libelle', 'date_debut', 'date_fin_prevue'];
    dataSource = new MatTableDataSource<any>([]);
    imgPromos : any = "assets/img/service.png";
//   selection = new SelectionModel<Promo>(true, []);
isSuperAdmin=false

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    active = true;
    inactive = true;

    constructor(private insertionService:InsertionService, private authService:AuthService,public dialog: MatDialog){}



ngOnInit():void {
    const userRole = this.authService.getConnected().role_id.libelle;
    if(userRole=="SUPER_ADMIN"){
      this.isSuperAdmin=true;
      this.displayedColumns = ['entreprise','responsable','telephone', 'email', 'nbre', 'actions'];
    }


      this.insertionService.getInsertions().pipe(
          map((data: any[]) => {
            const promoElements: any[] = [];
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            data.forEach(item => {
              const periodicElement: any = {
                  id: item.id,
                  entreprise: item.entreprise,
                  responsable: item.responsable,
                  date: item.date,
                  email: item.email,
                  telephone: item.telephone,
                  fonction: item.fonction,
                  nbre: item.nbre,

                  is_active: item.is_active,


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
      }
      ngAfterViewInit() {

          this.insertionService.getInsertions().pipe(
              map((data: any[]) => {
                const promoElements: any[] = [];
                data.forEach(item => {
                  const periodicElement: any = {
                    id: item.id,
                    entreprise: item.entreprise,
                    email: item.email,
                    telephone: item.telephone,
                    responsable: item.responsable,
                    date: item.date,
                    nbre: item.nbre,

                    is_active: item.is_active,

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

          }


          openAddRefDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
            let modal =this.dialog.open(AddEntrepriseDialogBox, {
                width: '1200px',
                enterAnimationDuration,
                exitAnimationDuration
            });
            modal.componentInstance.promo=1;


        }

}

export interface PeriodicElement {
    email: string;
    role: any;
    user: any;
    status: any;
}

let ELEMENT_DATA: any[] = [];



@Component({
    selector: 'add-entreprise-dialog',
    templateUrl: './add-entreprise-dialog.component.html',
})
export class AddEntrepriseDialogBox {

    apprenantForm!: FormGroup;
    isSubmitted!: boolean;
    // promo: number = 0;
    @Input()promo :number


    constructor(
        public dialogRef: MatDialogRef<AddEntrepriseDialogBox>,
        private formBuilder: FormBuilder,
        private insertionService:InsertionService,
        private router: Router,
        private route: ActivatedRoute,


    ) {}

    close(){
        this.dialogRef.close(true);
    }


    ngOnInit(){

        this.route.params.subscribe(params => {
            this.promo = params['id'];
          });


        this.apprenantForm = this.formBuilder.group({
          entreprise: ['', [Validators.required, Validators.maxLength(255)]],
          fonction: ['', [Validators.required, Validators.maxLength(255)]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
          responsable: ['', [Validators.maxLength(255)]],
          date: ['', [Validators.required]],
          adresse: ['', [Validators.maxLength(255)]],
          telephone: ['', [Validators.required, Validators.pattern(/^([0-9\s\-\+\(\)]*)$/), Validators.maxLength(255)]],
          nbre: ['', [Validators.required, Validators.pattern(/^([0-9]*)$/), Validators.maxLength(255)]],
          commentaire: ['', [Validators.required]],
        });
        }
        get form() {
          return this.apprenantForm.controls ;
        }


        /**
    * position sweet alert
 * @param position modal content
 */
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

    saveEntreprise(){

        if (this.apprenantForm.valid){
            this.insertionService.addInsertion(this.apprenantForm.value).subscribe({
                next: data => {
                  this.successAlert('Apprenant ajouté avec succès.');
                  this.router.navigateByUrl('/',{
                    skipLocationChange : true
                  }).then(() => {
                    this.router.navigate([`/pages/promos/detail/${this.promo}`]);
                  })
                }
                ,
                error: error => {
                  this.wrongAlert('Erreur lors de l\'ajout de \'Apprenant.');
                }
              });

              this.dialogRef.close(true);;
        }
    }

}
