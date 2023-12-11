import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const BEHAVIOR = 'BEHAVIOR'

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  object : any = {
  }

  data :BehaviorSubject<any> = new BehaviorSubject(this.object);

  constructor() { }

  save(){
    localStorage.setItem(BEHAVIOR,JSON.stringify(this.data.value))
  }

  restore(){
    let value = localStorage.getItem(BEHAVIOR);

    if (value) {
      this.data  = new BehaviorSubject(JSON.parse(value)) ;
      return;
    }
    this.data  = new BehaviorSubject(this.object);
  }

  getData() {
    return this.data.asObservable();
  }

  update(object : any) {
    return this.data.next(object)
  }

  erase() {
    return this.data.next(this.object)
  }

}
