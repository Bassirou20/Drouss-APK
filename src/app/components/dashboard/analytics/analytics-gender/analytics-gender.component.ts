import { Component, ViewChild, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
} from 'ng-apexcharts';
import { DashbordService } from 'src/app/components/pages-components/promos/shared/dashbord.service';
import { PromoService } from '../../../pages-components/promos/shared/promo.service';
import { Promo } from 'src/app/components/pages-components/promos/shared/promo.model';
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
    promos: Promo[];
};

@Component({
    selector: 'app-analytics-gender',
    templateUrl: './analytics-gender.component.html',
    styleUrls: ['./analytics-gender.component.scss'],
})
export class AnalyticsGenderComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    nombreHomme: number;
    pourcentageHomme: number;
    nombreTotalForme: number;
    promo: Promo[] = [];
    // @Input()promotions: Promo[]=[]

    constructor(
        public themeService: CustomizerSettingsService,
        private dashbordService: DashbordService,
        private PromoService: PromoService
    ) {
        this.chartOptions = {
            series: [70],
            chart: {
                height: 230,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: 5,
                            fontSize: '15px',
                            fontWeight: '700',
                        },
                    },
                },
            },
            colors: ['#00B69B'],
            labels: ['Male & Female'],
        };
    }

    getChartColor(libelle: string): string {
        if (libelle === 'Promo 1') {
            return 'red';
        } else if (libelle === 'Promo 2') {
            return 'green';
        } else {
            return 'blue'; // Couleur par défaut ou autre couleur de votre choix
        }
    }

    ngOnInit() {
        console.log(this.promo);

        // this.dashbordService.getAprenantsMasculin().subscribe((appM) => {
        //     this.nombreHomme = appM;
        //     this.pourcentageHomme = Math.trunc(
        //         (appM * 100) / this.nombreTotalForme
        //     );
        //     console.log(appM);

        //     if (this.promo && this.promo.length > 0) {
        //         const chartColor = this.getChartColor(this.promo[0].libelle);
        //         this.chartOptions.colors = [chartColor];
        //     }
        // });

        //    this.dashbordService.getGenderDataForPromo(9).subscribe(response=>{
        //     console.log(response);

        //    })

        // this.PromoService.getPromos().subscribe((nombPromo) => {
            
        //     this.promo = nombPromo;
        //     console.log(this.promo);
        // });
    }
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
