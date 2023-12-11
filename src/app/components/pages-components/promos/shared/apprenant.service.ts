import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { number } from 'echarts';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Apprenant } from './apprenant.model';
import { EventEmitter } from '@angular/core';



const ENTERPOINT = 'apprenants';





@Injectable({
  providedIn: 'root'
})
export class ApprenantService {
  apprenants: any;
  meta: any;
  user : any;
   promoSubject : number;
   refSubject :number;
   apprenantUpdate = new EventEmitter<void>();

  constructor(private http:HttpClient,private router: Router) {

    }

getApprenants(): Observable<any> {
  return this.http.get<Apprenant>(environment.apiUrl + ENTERPOINT).pipe(
    map(data => {
      return data;
    }
    ),
    catchError((error: any) => {
        return throwError(error);
    })
  );
}



postApprenant(apprenant: any,id: any,idRef: any): Observable<Apprenant> {



  const url = `${environment.apiUrl + ENTERPOINT}/${id}/${idRef}`;
  return this.http.post<any>(url, apprenant).pipe(
    catchError((error: any) => {
        return throwError(error);

    })
  );
}
search(matricule: any): Observable<any> {
  return this.http.post<any>(environment.apiUrl + ENTERPOINT+'/search', matricule).pipe(
    map((response: any) => {
      
      return response;
    }),
    catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
    })
  );
}
deleteApprenant(apprenant : any,motif: any): Observable<any> {

  return this.http.delete<any>(environment.apiUrl + ENTERPOINT+'/'+apprenant,{ params: { motif: motif } }).pipe(
    map((response: any) => {
      return response.data;
    }),
    catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
    })
  );
}
enableApprenant(apprenant : any): Observable<any> {

  return this.http.delete<any>(environment.apiUrl + ENTERPOINT+'/'+apprenant).pipe(
    map((response: any) => {
      return response.data;
    }),
    catchError((error: any) => {
      return throwError(() => new Error('Une erreur s\'est produite'));
    })
  );
}
reset(id : any): Observable<any> {
  console.log(id)
  return this.http.post<any>(environment.apiUrl + ENTERPOINT+'/reset',id ).pipe(
    map((response: any) => {
      console.log(response)
      return response;
    }),
    catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
    })
  );
}
  modificationApprenant(apprenant : any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + ENTERPOINT + '/' +apprenant.id, apprenant).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
    })
    );
  }
  postApprenantExcel(formData: FormData): Observable<Apprenant> {
    const url = `${environment.apiUrl + 'apprenant/ajout/excel'}`;
    return this.http.post<Apprenant>(url, formData).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
    })
    );
  }



  getApprenant(apprenant: number): Observable<any>{
    return this.http.get<any>(environment.apiUrl + ENTERPOINT+'/'+apprenant).pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          return throwError(() => new Error('Une erreur s\'est produite'));
        })
      );
  }
}
