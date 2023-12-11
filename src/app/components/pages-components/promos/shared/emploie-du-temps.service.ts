import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const ENTERPOINT = 'emploieDuTemps';

@Injectable({
  providedIn: 'root'
})

export class EmploieDuTempsService {

  constructor(private http : HttpClient) { }

  postCours(body : {}):Observable<any>{
    return  this.http.post<any>(environment.apiUrl+ENTERPOINT,body);
  }
  getCours(idRef : number, idPromo : number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+ENTERPOINT+'/ref/'+idRef+'/promo/'+idPromo);
  }
  editCours(body : {}, id:number):Observable<any>{
    return  this.http.put<any>(environment.apiUrl+ENTERPOINT+'/'+id,body);
  }
  deleteCours(id:number):Observable<any>{
    return  this.http.delete<any>(environment.apiUrl+ENTERPOINT+'/'+id);
  }


}
