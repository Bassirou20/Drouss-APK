import { Component, Input, ViewChild } from "@angular/core";
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-new-vs-returing',
    templateUrl: './new-vs-returing.component.html',
    styleUrls: ['./new-vs-returing.component.scss']
})
export class NewVsReturingComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    @Input() series: number[];
    @Input() title = '';
    @Input() label = '';
    @Input() pourcentageHomme:number
    @Input() pourcentageFemme:number
    @Input() pourcentagePromo: number ;
    @Input() nombreHomme = 0
    @Input() nombreFemme = 0
    @Input()color =[]

    constructor(
        public themeService: CustomizerSettingsService
    ) {
       
    }

    ngOnInit(){
        this.chartOptions = {
            series: [this.pourcentagePromo],
            chart: {
                height: 230,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "50%"
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: 5,
                            fontSize: "15px",
                            fontWeight: "700",
                        }
                    }
                }
            },
            // colors: ["#757FEF",'green'],
            // colors: [this.color],
            labels: [this.label]
        };
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}