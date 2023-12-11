import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const ENTERPOINT = 'referentiels';



@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  user : any;

  constructor(private http:HttpClient,private router: Router) {

  }



  getReferentiels(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + ENTERPOINT).pipe(
      map(data => {
        return data['data'];
      }
      ),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }

  addReferentiel(referentiel : any): Observable<any> {

    return this.http.post<any>(environment.apiUrl + ENTERPOINT, referentiel).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }
  deleteReferentiel(referentiel : any): Observable<any> {

    return this.http.delete<any>(environment.apiUrl + ENTERPOINT+'/'+referentiel).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }
  modificationReferentiel(referentiel: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + ENTERPOINT + '/' +referentiel.id, referentiel).pipe(
        map((response: any) => {
            return response.data;
        }),
        catchError((error: any) => {
            return throwError(() => error);
        })
    );
}
  getRefById(id: number): Observable<any> {
    const url = `${environment.apiUrl + ENTERPOINT}/${id}`;
    // console.log(url);
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }

}
