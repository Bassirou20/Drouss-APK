import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApprenantService } from '../shared/apprenant.service';

@Component({
  selector: 'app-confirm-enable-dialog',
  templateUrl: './confirm-enable-dialog.component.html',
  styleUrls: ['./confirm-enable-dialog.component.scss']
})
export class ConfirmEnableDialogComponent {
  isSendingRequest = false;
  

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
    public dialogRef: MatDialogRef<ConfirmEnableDialogComponent>,
    public apprenantServices: ApprenantService,
    private formBuilder: FormBuilder,

    
    ) { }
    ngOnInit(): void {
      this._fetchData();
      
    }
    close(){
      this.dialogRef.close(true);
    }
    private _fetchData() {
      
      this.apprenantServices.getApprenant(this.id).subscribe(
        data=>{

          this.apprenant=data.apprenant;
          
        }
      );
  

}
    
    activer(){ 
      if (this.isSendingRequest) {
        return; // A request is already being sent, so do nothing
      }
      
      this.isSendingRequest = true;
        
  this.apprenantServices.enableApprenant(this.id).subscribe({
            next: data => {
              this.successAlert('Apprenant activer avec succès.');
              this.apprenantServices.apprenantUpdate.emit();   
            },
            error: error => {
              console.log(error);
              this.wrongAlert('Erreur lors de l\'activation de l\'apprenant.');
            }
          });
         this.dialogRef.close(true);

         this.submitted = true;

        
      }

        
}
