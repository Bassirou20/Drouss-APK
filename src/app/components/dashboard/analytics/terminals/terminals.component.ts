import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NbreReferentiel } from 'src/app/components/pages-components/promos/shared/nbre-referentiel';

@Component({
    selector: 'app-terminals',
    templateUrl: './terminals.component.html',
    styleUrls: ['./terminals.component.scss']
})
export class TerminalsComponent {

    @Input() nombAppRef : NbreReferentiel ={
        'dev_data':0,
        'dev_web':0,
        'ref_dig':0
    }
    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleTheme() {
        this.themeService.toggleTheme();
    }
 

}