import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NbreReferentiel } from './nbre-referentiel';


import { GenderData } from './promo.model';

const ENTERPOINT = 'dashboard';

@Injectable({
  providedIn: 'root'
})

export class DashbordService {

  constructor(private http:HttpClient) { }

  getPromoInactivesAndApp(){
    return this.http.get<any>(environment.apiUrl + ENTERPOINT + "/promos/nonActive")   

  }
  getNombrePromo(): Observable<any> {
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/promos")
  }



  getAprenants(){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats")
  }

  getAprenantsFeminin(){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/feminin")
  }
  getApprenantsFemininByPromo(idPromo:number){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/feminin/"+idPromo)   
  }
  getApprenantsMasculinByPromo(idPromo:number){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/masculin/"+idPromo)   
  }
  getAprenantsMasculin(){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/masculin")
  }

  getAprenantsActuel(){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/actuel")
  }
  getNumAppById(idPromo:number){
    return this.http.get<number>(environment.apiUrl + ENTERPOINT + "/apprenats/"+idPromo)   
  }
  getAppActuelByRef(){
    return this.http.get<NbreReferentiel>(environment.apiUrl + ENTERPOINT + "/referentiels/apprenants")   
  }
  
}
