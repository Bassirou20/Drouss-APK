import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Behavior } from '../../shared/models/behavior';
import { BehaviorService } from '../../shared/services/behavior.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    hide = true;
    loginForm!: FormGroup;
    submitted = false;
    behavior : Behavior = {};
    logo : any = "assets/img/logo_sa.png";



    constructor(
        public themeService: CustomizerSettingsService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: AuthService,
        private authenticationService: AuthService,
        private behaviorService : BehaviorService,



    ) {}

    ngOnInit(): void {


        //Validation Set
        this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required]],
          password: ['', [Validators.required]],
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    onSubmit(){
        if (this.loginForm.invalid) {
            return;
          } else {
            this.authenticationService.login(this.loginForm.value).subscribe(
              (user:any)=>{
                  this.manageLocalStoreage(user)
                  this.router.navigateByUrl("/pages");
              },
              error=>{
                // this.toast.show(error.error.message, { classname: 'bg-danger text-center text-white', delay: 5000 });

              }
            );
          }

    }



    manageLocalStoreage(response:any) {
        this.service.setToken(response.token);
        this.behavior.user = response.user;
        this.behaviorService.update(this.behavior)
      }

}
