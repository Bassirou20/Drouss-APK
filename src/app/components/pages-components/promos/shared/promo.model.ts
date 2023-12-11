import { Referentiel } from "../../referentiels/services/referentiel.model";

export interface Promo {
  id?: number;
  libelle: string;
  is_active?: boolean;
  is_ongoing?: boolean;
  date_debut: Date;
  date_fin_prevue: Date;
  date_fin_reel?: Date;
  hommes:number,
  femmes:number,
  referentiels?:Referentiel[]
}


export interface GenderData {
    promo_id: number;
    promo_libelle: string;
    nombre_filles: number;
    nombre_garcons: number;
  }
