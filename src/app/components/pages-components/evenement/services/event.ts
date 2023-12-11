import { Time } from "@angular/common";
import { Referentiel } from "../../referentiels/services/referentiel.model";

export interface Event {
    id?:number
    subject : string;
    photo : string;
    description : string;
    event_date : Date;
    notification_date? : Date;
    event_time ?: Time
    user_id : number;
    is_active : number;
    referentiels? : Referentiel[]
}

