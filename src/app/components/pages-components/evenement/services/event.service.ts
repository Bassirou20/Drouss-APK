import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

const ENTERPOINT = 'events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  selectedEvent : any = null;
  constructor(private httpClient: HttpClient) { }


  getEvents(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl+ENTERPOINT)
  }
  getEventById(idEvent : number): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl+ENTERPOINT+'/'+idEvent)
  }
  addEvent(body : {}):Observable<any>{
   return this.httpClient.post<any>(environment.apiUrl+ENTERPOINT,body)
    
  }
  editEvent(body : {},id : number):Observable<any>{
    return this.httpClient.put<any>(environment.apiUrl+ENTERPOINT+"/"+id,body)
     
   }
   deleteEvent(id : number):Observable<any>{
    return this.httpClient.delete<any>(environment.apiUrl+ENTERPOINT+"/"+id)
     
  }
  annulerEvent(id : number):Observable<any>{
    return this.httpClient.put<any>(environment.apiUrl+ENTERPOINT+"/"+id+'/annulation',{})
  }
  restoreEvent(id : number):Observable<any>{
    return this.httpClient.put<any>(environment.apiUrl+ENTERPOINT+"/"+id+'/restauration',{})
  }
}
