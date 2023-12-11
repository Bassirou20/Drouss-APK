import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/model';
import { BehaviorService } from 'src/app/components/shared/services/behavior.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


const USER = 'user';

const TOKEN = 'token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any;
  userRole: string;
  constructor(private http:HttpClient,private router: Router, private behaviorService : BehaviorService) {

  }



  login(UserCred:any){
    return this.http.post(environment.apiUrl+"login",UserCred).pipe(
      catchError((error:any) => {
        return throwError(error);
      }),
      tap((response:any) => {
        this.setUser(response.user);
      })
    );
  }
  


  setUser(user:User){
    localStorage.setItem(USER,JSON.stringify(user));
   }

   getUser(){
    return this.user;
   }

   removeUser(){
    localStorage.removeItem(USER);
   }

   isLoggedIn(){
     return localStorage.getItem('token')!=null;
   }


   getToken(){
    return localStorage.getItem('token')||'';
   }

   setToken(token:string){
    localStorage.setItem(TOKEN,token);
   }

   logout() {
    localStorage.clear();
    this.behaviorService.erase();
    this.router.navigateByUrl('/');
  }

  hasRole(role : string) {
    if (this.user && this.user.role) {
      return this.user.role.libelle == role;
    }
    return false
  }

  getConnected(): any {
    const user = localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  isSuperAdmin() {
    const currentUser = this.getConnected();
    if (!currentUser) {
      console.error("User not found");
      return false;
    }
    if (!currentUser.role_id || !currentUser.role_id.libelle) {
      console.error("Role not found for user");
      return false;
    }
    this.userRole = currentUser.role_id.libelle;
    return this.userRole === 'SUPER_ADMIN';
  }
  
}