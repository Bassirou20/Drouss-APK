import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from './components/shared/services/behavior.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private behaviorService: BehaviorService,
        private renderer:Renderer2,
        private router : Router,
        ){

      }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander($event : any) {
      this.behaviorService.save();
    }

}
