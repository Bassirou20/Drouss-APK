import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { PromoService } from '../shared/promo.service';

@Component({
  selector: 'app-promoreferentiel-remove-dialog',
  templateUrl: './promoreferentiel-remove-dialog.component.html',
  styleUrls: ['./promoreferentiel-remove-dialog.component.scss']
})
export class PromoreferentielRemoveDialogComponent {
  selectedReferentiels: Referentiel[] = [];
  
 
  
  params!:number;
  
  @Input() promotion:number;

  successMessage: string = '';
  errorMessage: string = '';
  referentielsLinked!: Referentiel[];
 
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
    public dialogRef: MatDialogRef<PromoreferentielRemoveDialogComponent>,

    ) {
    
  }

  ngOnInit(): void {
  this._fetchData();
}

private _fetchData() {
  this.promoServices.getLinkedReferentiels(this.promotion).subscribe(referentielsLinked => {
     
    this.referentielsLinked = referentielsLinked;
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
  
 
  
  removeReferentiels() {
    
    this.selectedReferentiels.forEach(referentiel => {
      this.promoServices.removeReferentielToPromo(referentiel.id,this.promotion).subscribe({
        next: data => {
          this.successAlert('Referentiel retiré avec succès');
          this.promoServices.promoUpdate.emit();
          
        },
        error: error => {
          console.log(error);
          this.wrongAlert('Erreur lors du retrait du Référentiel.');
        }
      });
      
      this.dialogRef.close(true);
      this.selectedReferentiels = [];
      this.selectedReferentiels;
      
  
    })
    this.submitted = true;
  }
  
}

