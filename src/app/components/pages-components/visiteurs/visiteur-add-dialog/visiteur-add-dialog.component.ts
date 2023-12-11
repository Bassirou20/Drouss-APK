import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Visiteur } from '../shared/visiteur.model';
import { VisiteurService } from '../shared/visiteur.services';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
@Component({
  selector: 'app-visiteur-add-dialog',
  templateUrl: './visiteur-add-dialog.component.html',
  styleUrls: ['./visiteur-add-dialog.component.scss']
})
export class VisiteurAddDialogComponent {
  visiteurForm!: FormGroup;
  submitted = false;
  userRole : boolean
  
  
 
  

  constructor(
      public dialogRef: MatDialogRef<VisiteurAddDialogComponent>,
      private formBuilder: FormBuilder,
      private visiteurService: VisiteurService,
      private route: ActivatedRoute,
      private router: Router,
      private authService : AuthService

  ) {
    
}

  ngOnInit(){

   

    this.visiteurForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      INE: ['', [Validators.required]],
      motif: ['', [Validators.required]]
    });
    this.userRole = this.authService.isSuperAdmin();
  }    
    get form() {
      return this.visiteurForm.controls ;
    }

  close(){
      this.dialogRef.close(true);
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

  saveVisiteur() {
    if(this.userRole){
       
      if (this.visiteurForm.valid) {
        const visiteurData: Visiteur = {
          nom: this.visiteurForm.get('nom')?.value,
          prenom: this.visiteurForm.get('prenom')?.value,
          INE: this.visiteurForm.get('INE')?.value,
          motif: this.visiteurForm.get('motif')?.value
        };    
        
        
        this.visiteurService.postVisiteur(visiteurData).subscribe({
          next: data => {
            this.successAlert('Visiteur ajouté avec succès.');
            this.visiteurService.visiteurUpdate.emit();
          },
          error: error => {
            console.log(error);
            this.wrongAlert('Erreur lors de l\'ajout du visiteur.');
          }
        });
        
        this.dialogRef.close(true);
        
        
        
        
      }
    }
    else{
      console.log('pas le droit');
    }
    this.submitted = true
    
  }

}
