import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../services/referentiel.service';
@Component({
  selector: 'app-referentiel-add-dialog',
  templateUrl: './referentiel-add-dialog.component.html',
  styleUrls: ['./referentiel-add-dialog.component.scss']
})
export class ReferentielAddDialogComponent  {
  referentielForm: FormGroup;
   
    refId: any ;
  
    constructor(
        public dialogRef: MatDialogRef<ReferentielAddDialogComponent>,
        public themeService: CustomizerSettingsService,
        private formBuilder: FormBuilder,
        private refServices: ReferentielService,
    ) {
      this.referentielForm = this.formBuilder.group({
        libelle: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
    onInit(){
        
    }
   

    close(){
        this.dialogRef.close(true);
    }

    files: File[] = [];

    onSelect(event:any) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event:any) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
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
  saveReferentiel() {
    if (this.referentielForm.valid) {
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
    } else {
      this.wrongAlert("Erreur lors de l'ajout.");
    }
}


}
