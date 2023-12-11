import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Referentiel } from '../services/referentiel.model';
import { ReferentielService } from '../services/referentiel.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ReferentielAddDialogComponent } from '../referentiel-add-dialog/referentiel-add-dialog.component';
import Swal from 'sweetalert2';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';


@Component({
  selector: 'app-referentiel-list',
  templateUrl: './referentiel-list.component.html',
  styleUrls: ['./referentiel-list.component.scss']
})
export class ReferentielListComponent {
    @Input() referentiel: Referentiel | null = null;
    referentiels: Referentiel[] = [];
    submitted = false;
    referentielForm!: FormGroup;
    selectedReferentiel: Referentiel;
    isReferentielSelected: boolean = false;
    userRole: boolean;

    constructor(
        private referentielsService: ReferentielService,
        private formBuilder: FormBuilder,
        private refServices: ReferentielService,
        public dialog: MatDialog,
        public themeService: CustomizerSettingsService,
        private router : Router,
        private authService: AuthService
        ) {
            this.referentielForm = this.formBuilder.group({
                libelle: ['', Validators.required],
                description: ['', Validators.required]
              });
              if (this.selectedReferentiel) {
                this.referentielForm.patchValue({
                    libelle: this.selectedReferentiel.libelle,
                    description: this.selectedReferentiel.description
                });
            }
        }

    get form() {
        return this.referentielForm.controls;
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['referentiel'] && changes['referentiel'].currentValue) {
          const { libelle, description } = changes['referentiel'].currentValue;
          console.log('libelle', libelle);
          setTimeout(() => {
            this.referentielForm.patchValue({ libelle, description });
          }, 0);
        }
      }

    ngOnInit(): void {
        this.getReferentiels();
        this.userRole = this.authService.isSuperAdmin();
        
    }
    close(){
    }
    openCreateUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(ReferentielAddDialogComponent, {
            width: '1200px',
            enterAnimationDuration,
            exitAnimationDuration
        });
    }
    getReferentiels() {
        this.referentielsService.getReferentiels().subscribe({
            next: data => {
                this.referentiels = data;
            },
            error: error =>{
                console.log(error);
            }
    });

    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
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
    saveReferentiel() {
        if (this.userRole) {
            if (this.referentielForm.valid) {
                if(this.isReferentielSelected){
                    if (this.selectedReferentiel) {
                        this.selectedReferentiel.libelle = this.referentielForm.value.libelle ;
                        this.selectedReferentiel.description = this.referentielForm.value.description ;
                        this.referentielsService.modificationReferentiel(this.selectedReferentiel).subscribe({
                            next: () => {
                                this.successAlert("Modification effectuée avec succès");
                            },
                            error: (error) => {
                                this.wrongAlert("Erreur lors de la modification.");
                            }
                        });
                        this.referentielForm.reset();
                        this.isReferentielSelected = false ;
                        this.router.navigateByUrl('/',{
                            skipLocationChange : true
                        }).then(() => {
                            this.router.navigate(['/pages/referentiels']);
                        })
                    }
                }
                else{

                    this.refServices.addReferentiel(this.referentielForm.value).subscribe({
                        next: () => {
                            this.successAlert("Ajout effectuée avec succès");
                        },
                        error: (error) => {
                            this.wrongAlert("Erreur lors de l'ajout.");
                        }
                    });
                    this.referentielForm.reset();
                    this.close();
                    this.router.navigateByUrl('/',{
                        skipLocationChange : true
                    }).then(() => {
                        this.router.navigate(['/pages/referentiels']);
                    })
                }
            } else {
            this.wrongAlert("Erreur lors de l'ajout.");
            }
        }
        else{
            console.log('pas le droit');
        }
    }
    onReferentielSelected(referentiel: Referentiel): void {
        this.selectedReferentiel = referentiel;
        this.referentielForm.patchValue({
            libelle: this.selectedReferentiel.libelle,
            description: this.selectedReferentiel.description
        });
        this.isReferentielSelected = true;

      }
}
