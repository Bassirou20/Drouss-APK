

import { Component, Input } from '@angular/core';
import { Referentiel } from '../services/referentiel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Validators } from 'ngx-editor';
import { ReferentielService } from '../services/referentiel.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-referentiel-mod-dialog',
  templateUrl: './referentiel-mod-dialog.component.html',
  styleUrls: ['./referentiel-mod-dialog.component.scss']
})
export class ReferentielModDialogComponent  {
    @Input() referentiel!: Referentiel;
    selectedReferentiel : true ;
    imgRef : any = "assets/img/ref.jpg";
    isModification = false;
    referentiels: Referentiel[] = [];
    referentielFormM!: FormGroup;
    constructor(
        public themeService: CustomizerSettingsService,
        private referentielsService: ReferentielService,
        private formBuilder: FormBuilder,
        private location: Location


    ) {
    }
    get form() {
        return this.referentielFormM.controls;
      }

      ngOnInit(){
          this.referentielFormM = this.formBuilder.group({
              libelle: [this.referentiel.libelle, Validators.required],
              description: [this.referentiel.description, Validators.required]
            });
      }

    
    toggleModification() {
        this.isModification = !this.isModification;
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
    
    getReferentiels() {
        this.referentielsService.getReferentiels().subscribe({
            next: data => {
                this.referentiels = data;
            },
            error: error => {
                console.log(error);
            }
        });
    }
    deleteRef() {
        this.referentielsService.deleteReferentiel(this.referentiel.id).subscribe(() => {
            this.getReferentiels();
        });
        
    }
    modificationReferentielid() {
        if (this.referentielFormM.valid) {
            this.referentiel.libelle = this.referentielFormM.value.libelle ;
            this.referentiel.description = this.referentielFormM.value.description ;
            this.referentielsService.modificationReferentiel(this.referentiel).subscribe({
                next: () => {
                    this.successAlert("Modification effectuée avec succès");
                },
                error: (error) => {
                    this.wrongAlert("Erreur lors de la modification.");
                }
            });
        }
       
    
      }
      

}
