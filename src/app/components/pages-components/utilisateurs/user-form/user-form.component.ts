import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/utilisateur.model';
import { UserService } from '../shared/utilisateur.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  userForm: FormGroup;
  submitted = false;
  @Input() user: any;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder, public userServices: UserService,private router : Router) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
        // '', 
        // [
        //   Validators.pattern(
        //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        //   )
        // ]
     
      adresse: ['', Validators.required],
      role_id: ['', Validators.required],
      telephone: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        prenom: this.user.prenom,
        email: this.user.email,
        password: this.user.password,
        adresse: this.user.adresse,
        role_id: this.user.role_id.id,
        telephone: this.user.telephone
      });
      this.isEditMode = true;
    }
    else{
      this.isEditMode = false;
    }
  }
  get buttonText(): string {
    return this.isEditMode ? 'Modifier' : 'Ajouter';
  }

  successAlert(description: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: description,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  wrongAlert(description: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: description,
    });
  }
  getFormControlErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control && control.invalid && control.touched) {
      if (control.errors && control.errors['required']) {
        return 'Ce champ est requis.';
      }
    }
    return '';
  }
  
  
  onSubmit() {
    this.submitted = true;
    this.user = {...this.user, ...this.userForm.value};
    if (this.userForm.invalid) {
      return;
    }
    const user: User = {
      name: this.userForm.value.name,
      prenom: this.userForm.value.prenom,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      adresse: this.userForm.value.adresse,
      role_id: this.userForm.value.role_id,
      telephone: this.userForm.value.telephone
    };
    if (this.isEditMode && !this.userForm.value.password) {
      delete this.user.password;
    } else {
      this.user.password = this.userForm.value.password;
    }

    if (this.isEditMode) {
      this.userServices.modificationUser(this.user).subscribe({
        next: () => {
          this.successAlert('Modification effectuée avec succès');
        },
        error: (error) => {
          this.wrongAlert("Erreur lors de la modification.");
          console.log('erreur ', error);
        }
      });
    } else {
 
      this.userServices.postUsers(this.user).subscribe({
        next: () => {
          this.successAlert('Ajout effectuée avec succès');
        },
        error: (error) => {
          this.wrongAlert("Erreur lors de l'ajout.");
          console.log('erreur ', error);
        }
        
      });
    }
    this.router.navigateByUrl('/',{
      skipLocationChange : true
    }).then(() => {
      this.router.navigate(['/pages/utilisateurs']);
    });

    this.userForm.reset();
    this.submitted = false;
  }
}
