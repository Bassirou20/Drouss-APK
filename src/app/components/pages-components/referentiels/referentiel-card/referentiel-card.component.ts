import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Referentiel } from '../services/referentiel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Validators } from 'ngx-editor';
import { ReferentielService } from '../services/referentiel.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';

@Component({
    selector: 'app-referentiel-card',
    templateUrl: './referentiel-card.component.html',
    styleUrls: ['./referentiel-card.component.scss'],
})

export class ReferentielCardComponent {
    @Input() referentiel!: Referentiel;
    @Output() referentielSelected = new EventEmitter<Referentiel>();

    imgRef : any = "assets/img/ref.jpg";
    isModification = false;
    referentiels: Referentiel[] = [];
    referentielFormM: FormGroup;
    selectedReferentiel: Referentiel | null = null;
    userRole: boolean;

    constructor(
        public themeService: CustomizerSettingsService,
        private referentielsService: ReferentielService,
        private formBuilder: FormBuilder,
        private router : Router,
        private authService: AuthService



    ) {
        this.referentielFormM = this.formBuilder.group({
            libelle: ['', Validators.required],
            description: ['', Validators.required]
          });
    }
    ngOnInit() {
      this.userRole = this.authService.isSuperAdmin();
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
      if (this.userRole) {

        this.referentielsService.deleteReferentiel(this.referentiel.id).subscribe({
            next: () => {
                this.successAlert("Modification effectuée avec succès");
                this.router.navigateByUrl('/',{
                    skipLocationChange : true
                  }).then(() => {
                    this.router.navigate(['/pages/referentiels']);
                  })
            },
            error: (error) => {
                this.wrongAlert("Erreur lors de la Modification.");
            }
        });
      }
      else{
        console.log('pas le droit');
      }

    }
    modificationReferentielid() {
        console.log(this.referentielFormM.value);
        if (this.userRole) {

          if (this.referentielFormM.valid) {
              this.referentiel.libelle = this.referentielFormM.value.libelle ;
              this.referentiel.description = this.referentielFormM.value.description ;
              this.referentielsService.modificationReferentiel(this.referentiel).subscribe(() => {

            });
            console.log('good');
          }

      }
      else {
        console.log('pas le droit');
      }
      }
      editRef(referentiel: Referentiel): void {
        if (this.userRole) {

         this.referentielSelected.emit(referentiel); // Émet l'événement personnalisé avec le référentiel sélectionné
        }
        else{
          console.log('pas le droit');
        }
      }

}
