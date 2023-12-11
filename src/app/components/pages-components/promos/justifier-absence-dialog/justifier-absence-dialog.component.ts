import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PromoService } from '../shared/promo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-justifier-absence-dialog',
  templateUrl: './justifier-absence-dialog.component.html',
  styleUrls: ['./justifier-absence-dialog.component.scss']
})
export class JustifierAbsenceDialogComponent {
  justifyForm!: FormGroup;
 
  absence!:any;

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
    public dialogRef: MatDialogRef<JustifierAbsenceDialogComponent>) {
    
   }
  

 ngOnInit(): void {
  this.promoServices.promoUpdate.subscribe(() => {
    this.promoServices.getAbsence(this.id).subscribe(
      data=>{

        this.absence=data;
        
        this.justifyForm = this.formBuilder.group({
          motif: ["", [Validators.required]],
        });
      }
    );

  });
    
  this._fetchData();
  
}

private _fetchData() {
    
        this.promoServices.getAbsence(this.id).subscribe(
          data=>{

            this.absence=data;
            
            this.justifyForm = this.formBuilder.group({
              motif: ["", [Validators.required]],
              
            });
          }
        );
    

}
 close(){
  this.dialogRef.close(true);
}
  get form() {
    return this.justifyForm.controls;
  }

  
  justificationAbsence(id: any) {

    if (this.justifyForm.valid) {
      const justifyData: any = {
        id: id,
        motif : this.justifyForm.value.motif ,
       
      };
       
        this.promoServices.justifyAbsence(justifyData).subscribe({
          next: data => {
            this.successAlert('Absence justifier avec succès.');
            this.promoServices.promoUpdate.emit();   
          },
          error: error => {
           
            console.log(error);
            this.wrongAlert('Erreur lors de la justification de l\'absence .');
          }
        });
       this.dialogRef.close(true);
    }
    this.submitted = true;
  
  }
    
}
