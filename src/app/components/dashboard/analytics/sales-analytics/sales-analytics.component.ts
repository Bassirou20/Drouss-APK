import { Component, Input, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexGrid,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexYAxis,
    ApexLegend,
    ApexFill
} from "ng-apexcharts";
import { DashbordService } from "src/app/components/pages-components/promos/shared/dashbord.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    grid: ApexGrid;
    chart: ApexChart;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    colors: any;
};

@Component({
    selector: 'app-sales-analytics',
    templateUrl: './sales-analytics.component.html',
    styleUrls: ['./sales-analytics.component.scss']
})
export class SalesAnalyticsComponent {

    Hommes:any[]
    Femmes : any[]
    
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
     promosInactives:any[]=[];
  
    constructor(private dashbordService: DashbordService) {
        
        this.dashbordService.getPromoInactivesAndApp().subscribe(data=>{
            this.promosInactives=data.data
           this.Hommes= this.promosInactives.map(promo=>{
                return promo.nbreGarcon
            })
            this.Femmes=this.promosInactives.map(promo=>{
                return promo.nbreFille
            })
                
                this.chartOptions = {
                    series: [
                        {
                            name: "Hommes",
                            data: this.Hommes
                        },
                        {
                            name: "Femmes",
                            data: this.Femmes
                        },
                    ],
                    chart: {
                        type: "bar",
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: [
                            "Promo 1",
                            "Promo 2",
                            "Promo 3",
                            "Promo 4",
                        ],
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#165BAA",
                        //  "#A155B9",
                          "#F765A3"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };
                     
        })

    }
    ngOnInit(){
    //   console.log(this.getNbreHommes());
    this.getNbreHommes();
        // console.log(this.promosInactives);     
    }
    getNbreHommes(){
        this.dashbordService.getPromoInactivesAndApp().subscribe(data=>{
            this.promosInactives=data.data
            console.log(this.promosInactives);
           this.Hommes= this.promosInactives.map(promo=>{
                return promo.nbreGarcon
            })
            console.log(this.Hommes);
            
        })
        
      
    }

}