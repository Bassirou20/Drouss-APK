import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Presence } from './presence.model';


const ENTERPOINT = 'presences';

@Injectable({
  providedIn: 'root'
})

export class PresenceService {

  constructor(private http:HttpClient,private router: Router) { }


  // getPresences(): Observable<any> {
  //   return this.http.get<any>(environment.apiUrl + ENTERPOINT).pipe(
  //     map(data => {
  //       return data['data'];
  //     }
  //     ),
  //     catchError((error: any) => {
  //       return throwError(() => new Error('Une erreur s\'est produite'));
  //     })
  //   );
  // }
  getPresences(date: string = ''): Observable<any> {
    const params = {
      date: date
    };
    return this.http.get<any>(environment.apiUrl + ENTERPOINT, { params }).pipe(
      map(data => {
        return data['data'];
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }

getPresenceswithref(date: string = ''): Observable<Presence[]> {
    const params = { date };
    return this.http.get<any>(`http://localhost:8000/api/apprenantswithref`, { params })
    //   .pipe(
    //     map(data => data?.data ?? []),
    //     catchError((error: any) => throwError(new Error('Une erreur s\'est produite')))
    //   );
  }


}
