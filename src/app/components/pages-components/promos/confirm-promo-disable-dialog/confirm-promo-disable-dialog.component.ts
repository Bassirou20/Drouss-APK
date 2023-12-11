import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PromoService } from '../shared/promo.service';

@Component({
  selector: 'app-confirm-promo-disable-dialog',
  templateUrl: './confirm-promo-disable-dialog.component.html',
  styleUrls: ['./confirm-promo-disable-dialog.component.scss']
})
export class ConfirmPromoDisableDialogComponent {


  successAlert(description:string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: description,
      showConfirmButton: false,
      timer: 1500,
    });
  }
promo!:any
  wrongAlert(description:string) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: description,
      })
  }
  submitted = false;
  @Input() id:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ConfirmPromoDisableDialogComponent>,
    public promoServices: PromoService
    

    
    ) { }
    ngOnInit(): void {
      this._fetchData();
    }
    close(){
      this.dialogRef.close(true);
    }
    private _fetchData() {
      
          this.promoServices.getPromo(this.id).subscribe(
            data=>{

              this.promo=data.promo;
              
            }
          );
      

  }
    
    desactiver(){ 
  this.promoServices.deletePromo(this.id).subscribe({
            next: data => {
              this.successAlert('Promotion désactiver avec succès.');
              this.promoServices.promoUpdate.emit();   
            },
            error: error => {
              console.log(error);
              this.wrongAlert('Erreur lors de désactivation de la promotion.');
            }
          });
         this.dialogRef.close(true);

         this.submitted = true;

        
      }

        
}
