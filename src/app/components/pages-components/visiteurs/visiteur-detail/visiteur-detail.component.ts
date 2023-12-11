import { Component, Input } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import Swal from 'sweetalert2';
import { Visiteur } from '../shared/visiteur.model';
import { VisiteurService } from '../shared/visiteur.services';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
@Component({
  selector: 'app-visiteur-detail',
  templateUrl: './visiteur-detail.component.html',
  styleUrls: ['./visiteur-detail.component.scss']
})
export class VisiteurDetailComponent {
  @Input() visiteurs!: Visiteur;

  visiteurId: number;
  visiteur:any;
  tabDivInputs: string[] = [];
  visiteurForm!: FormGroup;
  userRole: boolean;


  submitted = false;
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

  constructor(
      public themeService: CustomizerSettingsService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private visiteurService: VisiteurService,
      private authService : AuthService

  ){}


  ngOnInit(): void {
    
    this.visiteurService.visiteurUpdate.subscribe(() => {
      this.getVisiteurId(this.visiteurId);
    });
  
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.route.params.subscribe(params => {
          this.visiteurId = +params['id'];
      });

      this.getVisiteurId(this.visiteurId);
     
      this.userRole= this.authService.isSuperAdmin();

  }

  get form() {
    return this.visiteurForm.controls ;
  }

  getVisiteurId(id:number){
      if (id) {
          this.visiteurService.getVisiteurById(id).subscribe(
            data=>{
              
              this.visiteur=data.data
              this.visiteurForm = this.formBuilder.group({
                nom: [this.visiteur.nom, [Validators.required]],
                prenom: [this.visiteur.prenom, [Validators.required]],
                INE: [this.visiteur.INE, [Validators.required]],
                motif: [this.visiteur.motif, [Validators.required]]
              });
            }
          );
      }
      
  }
 
  modifyVisiteur(visiteur: any){
    
    if (this.visiteurForm.valid && this.userRole) {
      
      
        visiteur.nom= this.visiteurForm.get('nom')?.value,
        visiteur.prenom= this.visiteurForm.get('prenom')?.value,
        visiteur.INE= this.visiteurForm.get('INE')?.value,
        visiteur.motif= this.visiteurForm.get('motif')?.value
      this.visiteurService.modificationVisiteur(visiteur).subscribe({
        next: data => {
          this.successAlert('Visiteur modifier avec succès.');
          this.visiteurService.visiteurUpdate.emit();
        },
        error: error => {
          console.log(error);
          this.wrongAlert('Erreur lors de la modification du visiteur.');
        }
      });
      
    }
    
    this.submitted = true
    

  }

  

}

