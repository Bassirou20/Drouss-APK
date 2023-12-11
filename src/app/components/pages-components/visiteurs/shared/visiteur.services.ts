import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { number } from 'echarts';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Visiteur } from './visiteur.model';

import { EventEmitter } from '@angular/core';


const ENTERPOINT = 'visiteurs';

@Injectable({
    providedIn: 'root'
  })
  export class VisiteurService {
    visiteurUpdate = new EventEmitter<void>();
    
  
    constructor(private http:HttpClient,private router: Router) {
  
      }
  
      getVisiteurs(): Observable<any> {
        return this.http.get<Visiteur>(environment.apiUrl + ENTERPOINT).pipe(
            map((response: any) => {
                return response;
              }),
          catchError((error: any) => {
              return throwError(() => new Error());
          })
        );
      }

      postVisiteur(visiteur: Visiteur): Observable<Visiteur> {
        const url = `${environment.apiUrl + ENTERPOINT}`;
        return this.http.post<any>(url, visiteur).pipe(
          catchError((error: any) => {
            return throwError(() => new Error());
          })
        );
      }

      getVisiteurById(visiteur: number): Observable<any>{
        return this.http.get<any>(environment.apiUrl + ENTERPOINT+'/'+visiteur).pipe(
            map((response: any) => {
              return response;
            }),
            catchError((error: any) => {
              return throwError(() => new Error());
            })
          );
      }

      modificationVisiteur(visiteur : any): Observable<any> {
        return this.http.put<any>(environment.apiUrl + ENTERPOINT + '/' +visiteur.id, visiteur).pipe(
          map((response: any) => {
            return response.data;
          }),
          catchError((error: any) => {
            return throwError(() => new Error());
          })
        );
      }
      
      
  }