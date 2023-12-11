import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insertion-card',
  templateUrl: './insertion-card.component.html',
  styleUrls: ['./insertion-card.component.scss']
})
export class InsertionCardComponent {

    @Input() insertion!: any;
    imgEntreprise : any = "assets/img/entreprise.png";


}
