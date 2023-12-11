import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


const ENTERPOINT = 'prospections';


@Injectable({
  providedIn: 'root'
})
export class InsertionService {

  constructor(private http:HttpClient,private router: Router) { }



  getInsertions(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + ENTERPOINT).pipe(
      map(data => {
        return data.data['data'];
      }
      ),
      catchError((error: any) => {
        return throwError(() => new Error('Une erreur s\'est produite'));
      })
    );
  }
}
