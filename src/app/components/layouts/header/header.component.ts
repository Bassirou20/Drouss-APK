import { Component, SimpleChanges } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../authentication/shared/services/auth.service';
import { BehaviorService } from '../../shared/services/behavior.service';
import { Behavior } from '../../shared/models/behavior';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprenantService } from '../../pages-components/promos/shared/apprenant.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../pages-components/utilisateurs/shared/utilisateur.model';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isToggled = false;
  behavior : Behavior = {}

  projetSignature="";
  projetName="";
  searchForm!: FormGroup;
  submitted = false;
  user:User;
  

  wrongAlert(description:string) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: description,
        showConfirmButton: true,
      })
  }
    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private behaviorService: BehaviorService,
        private formBuilder: FormBuilder,
        public apprenantServices: ApprenantService,
        private router:Router,
        private route: ActivatedRoute,

    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.behaviorService.getData().subscribe(data=>this.behavior=data);
        console.log('====================================');
        console.log(this.behavior);
        console.log('====================================');
    }
   



        
      
      get form() {
        return this.searchForm.controls ;
      }

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            matricule: ['', [Validators.required]],

          });
        this.behaviorService.getData().subscribe(data=>this.behavior=data);

        this.projetName = environment.projet.projetName;
        this.projetSignature = environment.projet.projetSignature;
        this.user = this.authService.getConnected();
        console.log('header',this.user);
      }


    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

    logout() {
        this.authService.logout();
      }

      search(){

        if (this.searchForm.valid) {
            const Data: any = {
             
              matricule : this.searchForm.value.matricule ,
              
            };
             
              this.apprenantServices.search(Data).subscribe({
                next: data => {
                //   this.successAlert('Promotion Modifier avec succès.');
                if(!data){
                  this.wrongAlert('Cet apprenant n\'existe pas ');
                    return;
                }
                const apprenant = data.id;
               
                const currentUrl = 'pages/detail/apprenant';
                const targetUrl = `${currentUrl}/${apprenant}`;
                this.router.navigateByUrl(targetUrl);
                
                this.searchForm.reset()
              
                
                },
                error: error => {
                  console.log(error);
                 this.wrongAlert('Cet apprenant n\'existe pas ');
                }
              });
             
          }
          this.submitted = true;
          
        }
      }


