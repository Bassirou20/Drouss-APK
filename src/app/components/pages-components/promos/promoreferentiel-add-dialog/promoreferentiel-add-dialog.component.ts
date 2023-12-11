import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { Promo } from '../shared/promo.model';
import { PromoService } from '../shared/promo.service';

@Component({
  selector: 'app-promoreferentiel-add-dialog',
  templateUrl: './promoreferentiel-add-dialog.component.html',
  styleUrls: ['./promoreferentiel-add-dialog.component.scss']
})
export class PromoreferentielAddDialogComponent {
  selectedReferentiels: Referentiel[] = [];
  
 
  
  params!:number;
  
  @Input() promotion:number;

  successMessage: string = '';
  errorMessage: string = '';
  referentiels!: Referentiel[];
 
  submitted = false;
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
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<PromoreferentielAddDialogComponent>,

    ) {
    
  }

  ngOnInit(): void {
  this._fetchData();
}

private _fetchData() {
  this.promoServices.getNotLinkedReferentiels(this.promotion).subscribe(referentiels => {
      
    this.referentiels = referentiels;
  }); 

}
close(){
  this.dialogRef.close(true);
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
  
  addReferentiels() {
    
    this.selectedReferentiels.forEach(referentiel => {
      this.promoServices.addReferentielToPromo(referentiel.id,this.promotion).subscribe({
        next: data => {
          this.successAlert('Referentiel ajouté avec succès');
          this.promoServices.promoUpdate.emit();
        },
        error: error => {
          console.log(error);
          this.wrongAlert('Erreur lors de l\'ajout du Référentiel.');
        }
      });
      
      this.dialogRef.close(true);
      this.selectedReferentiels = [];
      this.selectedReferentiels;
      
  
    })
    this.submitted = true;
  }
  
  
  
}
