import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'chart.js';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ApexFill } from 'ng-apexcharts';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';




export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
};
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {


    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    detailImg = "assets/img/detail_app.png";
    apprenantId: number;
    @Input() person: any;
    @Input() ref: any;
    @Input() promo: any;
    imgUser: any = "assets/img/apprenant.jpg";



    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,

    ) {
        this.chartOptions = {
            series: [50],
            chart: {
                height: 110,
                width: 110,
                offsetX: 2.5,
                type: "radialBar",
                sparkline: {
                    enabled: true,
                },
            },
            colors: ["#00B69B"],
            plotOptions: {
                radialBar: {
                    startAngle: -120,
                    endAngle: 120,
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: 3,
                            fontSize: "14px",
                            fontWeight: "700",
                        }
                    }
                }
            }
        };
    }



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


}
