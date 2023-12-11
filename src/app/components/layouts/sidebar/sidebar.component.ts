import { Component } from '@angular/core';
import { ToggleService } from '../header/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../authentication/shared/services/auth.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    panelOpenState = false;

    isToggled = false;
    projetSignature="";
    projetName="";
    logo : any = "assets/img/logo_sa.png";
    userRole: string;



    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private authService: AuthService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
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

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.projetName = environment.projet.projetName;
        this.projetSignature = environment.projet.projetSignature;
        const currentUser = this.authService.getConnected();
        if (currentUser) {
            this.userRole = currentUser.role_id.libelle;
        } else {
            console.error("User not found");
        }
    }

}
