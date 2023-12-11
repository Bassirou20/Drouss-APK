import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApprenantService } from '../shared/apprenant.service';

@Component({
  selector: 'app-apprenant-reset-dialog',
  templateUrl: './apprenant-reset-dialog.component.html',
  styleUrls: ['./apprenant-reset-dialog.component.scss']
})
export class ApprenantResetDialogComponent {

  

  apprenant!:any
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
    @Input() id:number;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      public dialogRef: MatDialogRef<ApprenantResetDialogComponent>,
      public apprenantServices: ApprenantService,
   
  
      
      ) { }
      
      close(){
        this.dialogRef.close(true);
      }
      
      
      reset(){    
        const Data: any = {
             
          id : this.id ,
          
        };
         
    this.apprenantServices.reset(Data).subscribe({
              next: data => {
                this.successAlert('Mot de passe réinitialiser avec succès.');
                this.apprenantServices.apprenantUpdate.emit();   
              },
              error: error => {
                console.log(error);
                this.wrongAlert('Erreur lors de la réinitialisation du mot de passe.');
              }
            });
           this.dialogRef.close(true);
  
           this.submitted = true;
  
          
        }
  
          
  }
  