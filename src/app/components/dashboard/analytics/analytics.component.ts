import { Component, OnInit } from '@angular/core';
import { PromoService } from '../../pages-components/promos/shared/promo.service';
import { DashbordService } from '../../pages-components/promos/shared/dashbord.service';
import { NbreReferentiel } from '../../pages-components/promos/shared/nbre-referentiel';

import { Promo } from '../../pages-components/promos/shared/promo.model';


@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
    series: number[];
    title: string;
    title2: string;
    label: string;
    pourcentageHomme: number;
    pourcentageFemme: number;
    pourcentagePromo: number = 20;
    apprenantsActuel: number;
    promotions: Promo[]=[];

    nombrePromo:number
    nombreTotalForme:number
    nombreFemme:number
    nombreHomme:number
    promosInactives:any[]=[]
    nombAppRef :NbreReferentiel

  constructor(private promoService: PromoService, private dashbordService: DashbordService){}

  ngOnInit(): void {
 
    this.pourcentagePromo  = 100
 
    this.getInfos()
    this.getPromosInactiveAndApp();
    this.getAppActuelleByRef()
  }
  getAppActuelleByRef(){
      return this.dashbordService.getAppActuelByRef().subscribe(data=>{
        this.nombAppRef=data;        
      })
  }
  formatPourcentage($pourcentage:number){
    return Math.round($pourcentage);
  }

  getPromosInactiveAndApp(){
    this.dashbordService.getPromoInactivesAndApp().subscribe((promos:any)=>{
        this.promosInactives=promos.data;              
    })
  }
  
  getInfos(){ 
    this.dashbordService.getNombrePromo().subscribe(
      nombPromo =>{
        this.nombrePromo = nombPromo        
      }
    )
    this.dashbordService.getAprenants().subscribe(
      app =>{
        this.nombreTotalForme = app
      }
    )
    this.dashbordService.getAprenantsFeminin().subscribe(
     appF =>{
        this.nombreFemme =appF
        this.pourcentageFemme=Math.trunc((appF*100)/this.nombreTotalForme)
      }
    )
    this.dashbordService.getAprenantsMasculin().subscribe(
      appM =>{
         this.nombreHomme =appM 
         this.pourcentageHomme=Math.trunc((appM*100)/this.nombreTotalForme)
         
       }
     )
    this.dashbordService.getAprenantsActuel().subscribe(
      data =>{
        this.apprenantsActuel = data
      }
    )
  }
}
