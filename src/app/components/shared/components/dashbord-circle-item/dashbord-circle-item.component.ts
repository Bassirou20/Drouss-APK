import { Component, ViewChild } from '@angular/core';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexDataLabels,
    ApexChart
} from "ng-apexcharts";
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    series2: ApexNonAxisChartSeries;
    series3: ApexNonAxisChartSeries;
    series4: ApexNonAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashbord-circle-item',
  templateUrl: './dashbord-circle-item.component.html',
  styleUrls: ['./dashbord-circle-item.component.scss']
})
export class DashbordCircleItemComponent {


    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.chartOptions = {
            series: [80],
            series2: [50],
            series3: [30],
            series4: [60],
            chart: {
                height: 120,
                offsetX: -120,
                type: "radialBar"
            },
            colors: ["#757FEF"],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "50%"
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#757FEF",
                            offsetY: 5,
                            show: true
                        }
                    }
                }
            }
        };
    }

}
