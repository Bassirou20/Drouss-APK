import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-add-emploie-du-temps',
  templateUrl: './add-emploie-du-temps.component.html',
  styleUrls: ['./add-emploie-du-temps.component.scss']
})
export class AddEmploieDuTempsComponent {

  constructor(public dialogRef: MatDialogRef<AddEmploieDuTempsComponent>,
              private fb : FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject (MAT_DATE_LOCALE) private _locale: string ,
    ) {}

  actionCours : string = 'Ajout'
  submited = false;
  formEmploieDuTemps=this.fb.group({
    nom_cours : ['',Validators.required],
    date_cours : ['',[Validators.required,dateAfterValidator()]],
    heure_debut : ['', [Validators.required,heureAfterValidator("08:00","15:00")]],
    heure_fin : ['', [Validators.required,heureAfterValidator("09:00","16:00")]],
  })
  ngOnInit(){
    this ._locale = 'fr' 
      if (this.data) {        
        this.actionCours="Edit"
        this.formEmploieDuTemps.get("nom_cours")?.setValue(this.data.title)
        this.formEmploieDuTemps.get("date_cours")?.setValue(this.data.start.split(" ")[0])
        this.formEmploieDuTemps.get("heure_debut")?.setValue(this.data.start.split(" ")[1])
        this.formEmploieDuTemps.get("heure_fin")?.setValue(this.data.end.split(" ")[1])
      }
  }

  getFormControlErrorMessage(controlName: string): string {
    const control = this.formEmploieDuTemps.get(controlName);
    if (control && control.invalid && control.touched && this.submited) {
      if (control.errors && control.errors['required']) {
        return 'Ce champ est requis.';
      }
    }
    return '';
  }
  close(){
    this.dialogRef.close()
  }
  validerCours(){    
    this.submited = true;
    if(this.actionCours=="Ajout"){
      let dataSender ={action : this.actionCours, data : this.formEmploieDuTemps.getRawValue()}
      console.log(dataSender);
      this.dialogRef.close(dataSender);
    }
    else if (this.actionCours=="Edit"){
      let id = this.data.id
      let dataSender ={action : this.actionCours, data :{...this.formEmploieDuTemps.getRawValue(),id} }
      console.log(dataSender);
      
      this.dialogRef.close(dataSender);
    }
  }
  submit(){
    this.submited=true;
    console.log(this.submited);
    
  }
  suppCours(){
    Swal.fire({
      title: 'Etes vous sûr de vouloir supprimer ce cours ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je confirme!'
  }).then((result) => {
      if (result.isConfirmed) {
        this.actionCours="Supp"
        let dataSender= {data :this.data.id}
        this.dialogRef.close(dataSender);   
      }
  })   
  }

}
function   dateAfterValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const date  = control.value;;
    if(!date) {
      return null;
    }
    const dateValue = new Date(date);
    const now = new Date();
    
    if(dateValue.setSeconds(24*60*60) < now.getTime()) {
      return {
        dateAfter: true  
      };
    } 
    return null;
  };
}
function   heureAfterValidator(hrMin : string, hrMax : string): ValidatorFn {
  return (control: AbstractControl) => {
    const hr  = control.value;;
    if(!hr) {
      return null;
    }
    if(hr < hrMin || hr > hrMax) {
      return {
        heureAfter: true  
      };
    } 
    return null;
  };
}
