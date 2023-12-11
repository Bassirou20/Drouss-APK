import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-analytics-stats',
    templateUrl: './analytics-stats.component.html',
    styleUrls: ['./analytics-stats.component.scss']
})
export class AnalyticsStatsComponent {
    @Input() nombrePromo:number
    @Input() nombreTotalForme:number
    @Input() nombreFemme:number
    @Input() pourcentageFemme:number
    @Input() pourcentageHomme:number
    @Input() apprenantsActuel:number
    

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}