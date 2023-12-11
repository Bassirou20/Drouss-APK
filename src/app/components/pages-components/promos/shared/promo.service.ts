import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Apprenant } from './apprenant.model';
import { EventEmitter } from '@angular/core';
import { Promo } from './promo.model';


const ENTERPOINT = 'promos';


@Injectable({
  providedIn: 'root'
})
export class PromoService {
  promoUpdate = new EventEmitter<void>();

  constructor(private http:HttpClient,private router: Router) {

  }


  getApprenByPromo(id: number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'promo/${id}/gender-count')
  }

  getPromoActuel(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + ENTERPOINT+'/promoActuel')
  }
  getPromos(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + ENTERPOINT).pipe(
      map(data => {
        return data;
      }
      ),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getAbsences(id: number,idRef: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}/${idRef}/absences`;

    return this.http.get<any>(url).pipe(
      map(data => {

        return data['data'];
      }
      ),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getAbsence(id: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}/absence`;

    return this.http.get<any>(url).pipe(
      map(data => {

        return data['data'];
      }
      ),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getPromo(id: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}`;
    // console.log(url);
    return this.http.get<any>(url).pipe(
      map((response: any) => {

        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  getNotLinkedReferentiels(id : number): Observable<any> {
    return this.http.get<any>(environment.apiUrl +  ENTERPOINT+'/'+'detail/'+id).pipe(
      map(data => {

        return data;
      }
      ),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getLinkedReferentiels(id : number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'pages/' +ENTERPOINT+'/'+'detail/'+id).pipe(
      map(data => {

        return data;
      }
      ),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getPromosRefApp(id: number,idRef: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}/${idRef}`;
    //console.log(url);
    return this.http.get<Apprenant>(url).pipe(
      map((response: any) => {

        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getInactifApp(id: number,idRef: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}/${idRef}/inactif`;
    //console.log(url);
    return this.http.get<Apprenant>(url).pipe(
      map((response: any) => {

        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  addReferentielToPromo(referentiel : any,id: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/detail/${id}`;
    const body = { referentiels: referentiel };
    return this.http.put<any>(url,body).pipe(
      map((response: any) => {

        return response.data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  postPromos(promo: any): Observable<Promo> {
    return this.http.post<any>(environment.apiUrl + ENTERPOINT, promo).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
  removeReferentielToPromo(referentiel : any,id: number): Observable<any> {
    const url = `${environment.apiUrl +'pages/'+ ENTERPOINT}/detail/${id}`;
    const body = { referentiels: referentiel };
    return this.http.put<any>(url,body).pipe(
      map((response: any) => {

        return response.data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  deletePromo(promo : any): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + ENTERPOINT+'/'+promo).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  modificationPromo(promo : any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + ENTERPOINT + '/' +promo.id, promo).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  justifyAbsence(absence : any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'absences' + '/' +absence.id, absence).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }



  getClasseRefDetails(promoId: number, refId: number): Observable<any> {
    const url = `${environment.apiUrl}promos/${promoId}/${refId}`; // Assurez-vous de remplacer avec le véritable endpoint de votre API
    return this.http.get<any>(url).pipe(
      map(data => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}

export { Promo };
