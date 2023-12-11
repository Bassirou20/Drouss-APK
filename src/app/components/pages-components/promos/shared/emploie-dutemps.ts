import { Time } from "@angular/common";

export interface EmploieDutemps {
    id?: number;
    nom_cours : string;
    date_cours : Date;
    heure_debut : string;
    heure_fin : string;
    idRef : number;
}
