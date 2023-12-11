import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApprenantService } from '../shared/apprenant.service';


@Component({
  selector: 'app-confirm-disable-dialog',
  templateUrl: './confirm-disable-dialog.component.html',
  styleUrls: ['./confirm-disable-dialog.component.scss'],

})
export class ConfirmDisableDialogComponent  implements OnInit{
  
  


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
  disableForm!: FormGroup;
apprenant!:any
  @Input() id:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ConfirmDisableDialogComponent>,
    public apprenantServices: ApprenantService,
    private formBuilder: FormBuilder,


    ) { }
    ngOnInit(): void {
      this._fetchData();
      this.disableForm = this.formBuilder.group({
        motif: ['', [Validators.required]],
      });

    }

    private _fetchData() {
      
      this.apprenantServices.getApprenant(this.id).subscribe(
        data=>{

          this.apprenant=data.apprenant;
          
        }
      );
  

}
    
    
    get form() {
      return this.disableForm.controls ;
    }
    close(){
      this.dialogRef.close(true);
    }
    desactiver(){
      if (this.disableForm.valid) {
        
       const motif= this.disableForm.get('motif')?.value; 
  this.apprenantServices.deleteApprenant(this.id,motif).subscribe({
            next: data => {
              this.successAlert('Apprenant désactiver avec succès.');
              this.apprenantServices.apprenantUpdate.emit();
            },
            error: error => {
              console.log(error);
              this.wrongAlert('Erreur lors de la désactivation de l\'apprenant.');
            }
          });
         this.dialogRef.close(true);

        }
        this.submitted = true;
      }


}
