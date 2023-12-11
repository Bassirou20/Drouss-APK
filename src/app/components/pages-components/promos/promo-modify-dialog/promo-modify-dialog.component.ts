import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Promo } from '../shared/promo.model';
import { PromoService } from '../shared/promo.service';

@Component({
  selector: 'app-promo-modify-dialog',
  templateUrl: './promo-modify-dialog.component.html',
  styleUrls: ['./promo-modify-dialog.component.scss']
})
export class PromoModifyDialogComponent {
  promoForm!: FormGroup;

  promo!:Promo;

  @Input() id:number;
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
  submitted = false;
  constructor(public promoServices: PromoService, private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<PromoModifyDialogComponent>) {

   }


 ngOnInit(): void {
  this.promoServices.promoUpdate.subscribe(() => {
    this.promoServices.getPromo(this.id).subscribe(
      data=>{

        this.promo=data.promo;

        this.promoForm = this.formBuilder.group({
          libelle: [this.promo.libelle, [Validators.required]],
          date_debut: [this.promo.date_debut, [Validators.required]],
          date_fin_prevue: [this.promo.date_fin_prevue, [Validators.required]],
          date_fin_reel: [this.promo.date_fin_reel]
        });
      }
    );

  });

  this._fetchData();

}

private _fetchData() {

        this.promoServices.getPromo(this.id).subscribe(
          data=>{

            this.promo=data.promo;

            this.promoForm = this.formBuilder.group({
              libelle: [this.promo.libelle, [Validators.required]],
              date_debut: [this.promo.date_debut, [Validators.required]],
              date_fin_prevue: [this.promo.date_fin_prevue, [Validators.required]],
              date_fin_reel: [this.promo.date_fin_reel]
            });
          }
        );


}
 close(){
  this.dialogRef.close(true);
}
  get form() {
    return this.promoForm.controls;
  }


  modificationPromo(id: any) {

    if (this.promoForm.valid) {
      const promoData: Promo = {
        id: id,
        libelle : this.promoForm.value.libelle ,
        date_debut : this.promoForm.value.date_debut ,
        date_fin_prevue : this.promoForm.value.date_fin_prevue ,
        date_fin_reel : this.promoForm.value.date_fin_reel ,
        hommes:this.promoForm.value.hommes,
        femmes:this.promoForm.value.femmes
      };

        this.promoServices.modificationPromo(promoData).subscribe({
          next: data => {
            this.successAlert('Promotion Modifier avec succès.');
            this.promoServices.promoUpdate.emit();
          },
          error: error => {

            console.log(error);
            this.wrongAlert('Erreur lors de la modification de la promotion.');
          }
        });
       this.dialogRef.close(true);
    }
    this.submitted = true;

  }

}
