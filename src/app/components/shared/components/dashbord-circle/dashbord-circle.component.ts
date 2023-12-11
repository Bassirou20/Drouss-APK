import { Component, Input, ViewChild } from '@angular/core';

import {
    ApexNonAxisChartSeries,
    ApexTooltip,
    ApexLegend,
    ApexStroke,
    ApexChart,
    ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: any;
    colors: any;
};
@Component({
  selector: 'app-dashbord-circle',
  templateUrl: './dashbord-circle.component.html',
  styleUrls: ['./dashbord-circle.component.scss']
})
export class DashbordCircleComponent {

    @Input() totalApprenante: number = 0;
    @Input() totalDemande: number = 0;

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        console.log(this.totalApprenante);

        this.chartOptions = {
            series: [56.2, 43.8],
            colors: ["#ee368c", "#757fef"],
            chart: {
                height: 365,
                type: "donut"
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "" + val + "%";
                    },
                },
            },
            stroke: {
                width: 1,
                show: true
            },
            legend: {
                offsetY: 0,
                fontSize: "14px",
                position: "bottom",
                horizontalAlign: "center"
            },
            labels: ["Inserer", "Reste"]
        };
    }

}
