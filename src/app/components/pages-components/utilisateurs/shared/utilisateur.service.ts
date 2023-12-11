import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { User } from './utilisateur.model';
import { environment } from 'src/environments/environment';


const ENTERPOINT = 'users';


@Injectable({
    providedIn: 'root'
  })
export class UserService {

constructor(private http:HttpClient,private router: Router) {}
    getUsers(): Observable<any> {
        return this.http.get<User>(environment.apiUrl + ENTERPOINT).pipe(
        map(data => {
            return data;
        }
        ),
        catchError((error: any) => {
          return throwError(() => new Error('Une erreur s\'est produite'));
        })
        );
    }
    deleteUSer(User : any): Observable<any> {
   
        return this.http.delete<any>(environment.apiUrl + ENTERPOINT+'/'+User).pipe(
          map((response: any) => {
            return response.data;
          }),
          catchError((error: any) => {
            return throwError(() => new Error(error));
          })
        );
      }
      postUsers(User: any): Observable<any> {
        return this.http.post<User>(environment.apiUrl + ENTERPOINT, User).pipe(
          catchError((error: any) => {
            console.log(error); 
            return throwError(() => new Error(error)); 
          })
        );
      }
      modificationUser(user : any): Observable<any> {
        return this.http.put<any>(environment.apiUrl + ENTERPOINT + '/' +user.id, user).pipe(
          map((response: any) => {
            console.log(response);
            return response.data;
          }),
          catchError((error: any) => {
            console.log(error);
            return throwError(() => new Error(error));
        }));
      }

}
