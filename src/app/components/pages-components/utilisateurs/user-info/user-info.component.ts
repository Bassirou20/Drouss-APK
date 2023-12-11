import { Component, Input } from '@angular/core';
import { User } from '../shared/utilisateur.model';
import { UserService } from '../shared/utilisateur.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  constructor(public userServices: UserService,private router : Router) {}

  @Input() user: any;
  @Input() showUserInfo : boolean;
  
  showForm = false;
 
  
  
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
  closeUserInfo(): void {
    this.showUserInfo = !this.showUserInfo;
  }
  desactiver() {
    this.userServices.deleteUSer(this.user.id).subscribe({
      next: () => {
          this.successAlert("Modification effectuée avec succès");
      },
      error: (error) => {
          this.wrongAlert("Erreur lors de la modification.");
      }
    });
    this.router.navigateByUrl('/',{
      skipLocationChange : true
    }).then(() => {
      this.router.navigate(['/pages/utilisateurs']);
    });
  }
  
  onModifierClick() {
    this.showForm = !this.showForm;
  }
  resetPassword(){
    this.user.password = "Passer123?" ;
    this.user.role_id = this.user.role_id.id ;
    console.log("reset",this.user);
    this.userServices.modificationUser(this.user).subscribe({
      next: () => {
        this.successAlert("Reset du mot de passe effectuer avec succes");
    },
    error: (error) => {
        this.wrongAlert("Erreur lors du reset du mot de passe");
    }
    });
    this.router.navigateByUrl('/',{
      skipLocationChange : true
    }).then(() => {
      this.router.navigate(['/pages/utilisateurs']);
    });
  }
  
}
