import { Component } from '@angular/core';
import { AuthService } from '../../authentication/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../utilisateurs/shared/utilisateur.service';
import { User } from '../utilisateurs/shared/utilisateur.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  form: FormGroup;
  currentUser: any;
  user: any ;
  constructor(
    private authService: AuthService,
     private fb: FormBuilder,public userServices: UserService,
     private router : Router
    )
     {
  }

  ngOnInit() {
    this.currentUser = this.authService.getConnected();
    this.initForm();
    this.user= this.currentUser ;
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

  initForm() {
    this.form = this.fb.group({
      name: [this.currentUser.name, Validators.required],
      prenom: [this.currentUser.prenom, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      telephone: [this.currentUser.telephone],
      adresse: [this.currentUser.adresse],
      password: ['']
    });
  }
  onSubmit() {
    this.user = {...this.user, ...this.form.value};
    delete this.user?.role_id;
    if (!this.form.value.password) {
      delete this.user.password;
    }
    this.userServices.modificationUser(this.user).subscribe({
      next: (updatedUser: User) => {
        this.successAlert('Modification effectuée avec succès');
        this.user = updatedUser;
        this.authService.setUser(this.user);
        this.initForm();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/pages/profile']);
        });
      },
      error: (error) => {
        this.wrongAlert("Erreur lors de la modification.");
        console.log('erreur ', error);
      }
    });
  }


}