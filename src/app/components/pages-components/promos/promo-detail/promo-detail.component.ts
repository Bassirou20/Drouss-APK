import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromoService } from '../shared/promo.service';
import { PromoRef } from '../shared/promoref.model';
import { Promo } from '../shared/promo.model';

import { Referentiel } from '../../referentiels/services/referentiel.model';
import { MatDialog } from '@angular/material/dialog';
import { PromoreferentielAddDialogComponent } from '../promoreferentiel-add-dialog/promoreferentiel-add-dialog.component';
import { PromoreferentielRemoveDialogComponent } from '../promoreferentiel-remove-dialog/promoreferentiel-remove-dialog.component';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent {

  selectedReferentiels: Referentiel[] = [];
    promoRef: Promo ;
    refLength: number;
    nombreApprenant: number ;
    nombreApprenantInactive: number ;
    totalApprenant: number ;
    promo!:any;
    params!:number;
    imgRef : any = "assets/img/ref.jpg";
    isSuperAdmin=false
    referentiels:any
    refInactive:any






    constructor(public promoServices: PromoService,private router: Router,private route: ActivatedRoute,public dialog: MatDialog,
      private authService: AuthService,public themeService: CustomizerSettingsService

      ) {
      this.route.params.subscribe(params => {
        this.promo = params['id'];
      });
    }

    ngOnInit(): void {
      const userRole = this.authService.getConnected().role_id.libelle;
  if(userRole=="SUPER_ADMIN"){
    this.isSuperAdmin=true;

  }
      this.promoServices.promoUpdate.subscribe(() => {
        this.promoServices.getPromo(this.params).subscribe(
          data=>{

            this.promoRef=data.promo;

            this.nombreApprenant=data.nombre_apprenant;
            this.nombreApprenantInactive=data.nombre_apprenant_inactive;

            this.refLength=data.promo.referentiels.length;
            this.refInactive=data.refI

          }
        );
      });


        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
          this.params = +param
        }
      this._fetchData();
    }
    isReferentielInactive(referentielId: any): boolean {
      return this.refInactive.some((ref: { referentiel_id: any; }) => ref.referentiel_id === referentielId);
    }

    private _fetchData() {
        if (this.params) {
            this.promoServices.getPromo(this.params).subscribe(
              data=>{
                
                this.promoRef=data.promo;

                this.nombreApprenant=data.nombre_apprenant;
                this.nombreApprenantInactive=data.nombre_apprenant_inactive;
                this.refLength=data.promo.referentiels.length;
                this.refInactive=data.refI

              }
            );
        }

    }

  openAddRefDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let modal =this.dialog.open(PromoreferentielAddDialogComponent, {
        width: '1200px',
        enterAnimationDuration,
        exitAnimationDuration
    });
    modal.componentInstance.promotion=this.promo;


}

openRemoveRefDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  let modal =this.dialog.open(PromoreferentielRemoveDialogComponent, {
      width: '1200px',
      enterAnimationDuration,
      exitAnimationDuration
  });
  modal.componentInstance.promotion=this.promo;


}




}
