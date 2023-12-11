import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { ReferentielService } from '../../referentiels/services/referentiel.service';
import { Promo } from '../shared/promo.model';
import { PromoService } from '../shared/promo.service';

@Component({
  selector: 'app-promo-create',
  templateUrl: './promo-create.component.html',
  styleUrls: ['./promo-create.component.scss']
})
export class PromoCreateComponent {
   
    promoForm!: FormGroup;
    
    submitted = false;
    selectedReferentiels: Referentiel[] = [];
  
 
  
    
   
  
    successMessage: string = '';
    errorMessage: string = '';
    referentiels!: Referentiel[];
   
   
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
    constructor(public promoServices: PromoService,
       private formBuilder: FormBuilder,
       private router: Router,
       private referentielsService: ReferentielService,

       ) {

    }

    ngOnInit(): void {
      this.promoForm = this.formBuilder.group({
        libelle: ['', [Validators.required]],
        date_debut: ['', [Validators.required]],
        date_fin_prevue: ['', [Validators.required]],
      });
      
      this._fetchData();
    }
    
    private _fetchData() {
      this.referentielsService.getReferentiels().subscribe(referentiels => {
          
        this.referentiels = referentiels;
      }); 
    
    }

    isSelected(referentiel: Referentiel): boolean {
      return this.selectedReferentiels.some(r => r.id === referentiel.id);
    }
    
    toggleSelection(referentiel: Referentiel): void {
      const index = this.selectedReferentiels.findIndex(r => r.id === referentiel.id);
      if (index === -1) {
        this.selectedReferentiels.push(referentiel);
      } else {
        this.selectedReferentiels.splice(index, 1);
      }
    }
    get form() {
      return this.promoForm.controls;
    }
    
    errorMessages: string[] = [];
    savePromo() {
      if (this.promoForm.valid) {
        const promoData: any = {
          libelle: this.promoForm.get('libelle')?.value,
          date_debut: new Date(this.promoForm.get('date_debut')?.value).toISOString().substring(0, 10).replace(/-/g, '/'),
          date_fin_prevue: new Date(this.promoForm.get('date_fin_prevue')?.value).toISOString().substring(0, 10).replace(/-/g, '/'),
        }; 
        
        this.promoServices.postPromos(promoData).subscribe({
          next: data => {
            this.router.navigateByUrl("/pages/promos");
            this.successAlert('Promotion ajouté avec succès');
            // this.promoServices.promoUpdate.emit();
            
          },
          error: error => {
            this.errorMessages=error.error.message; 
            console.log(this.errorMessages);
            this.wrongAlert('Erreur lors de l\'ajout de la Promotion.');
          }
        });
        
       
      }
      this.submitted = true
    }

    savePromoWithRef() {
      if (this.promoForm.valid) {
        const ref: any[] = [];
        this.selectedReferentiels.forEach(element => {
          ref.push(element.id);
        });
        const promoData: any = {
          libelle: this.promoForm.get('libelle')?.value,
          date_debut: new Date(this.promoForm.get('date_debut')?.value).toISOString().substring(0, 10).replace(/-/g, '/'),
          date_fin_prevue: new Date(this.promoForm.get('date_fin_prevue')?.value).toISOString().substring(0, 10).replace(/-/g, '/'),
          referentiels: ref
        }; 
   
        this.promoServices.postPromos(promoData).subscribe({
          next: data => {
            this.router.navigateByUrl("/pages/promos");
            this.successAlert('Promotion ajouté avec succès');
            // this.promoServices.promoUpdate.emit();
            
          },
          error: error => {
            console.log(error);
            this.wrongAlert('Erreur lors de l\'ajout de la Promotion.');
          }
        });
        
        this.promoForm.reset();
        
      }
      this.submitted = true
    }
}
