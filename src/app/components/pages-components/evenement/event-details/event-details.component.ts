import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '../services/event';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { ReferentielService } from '../../referentiels/services/referentiel.service';
import { Apprenant } from '../../presence/shared/presence.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  displayedColumns: string[] = [
  'image',
  'nom',
  'prenom',
  'email',
  'genre',
  'telephone',
  'presence',
  'actions',];
  dataSource = new MatTableDataSource<Apprenant>([]);
  idEvent : number
  params : number
  eventSelected : Event
  referentiels : Referentiel[]
  apprenants : Apprenant[]
  imgUser: any = 'assets/img/apprenant.jpg';


    constructor(private fb : FormBuilder, private route : ActivatedRoute,private router : Router,
                private eventService : EventService, private refService : ReferentielService 
      ){
        this.route.params.subscribe(params => {
          this.idEvent = params['idEvent'];
        });
      }
    
    formEvent=this.fb.group({
      subject : ["", [Validators.required]],
      description : ["",[Validators.required]],
      event_date : ["",dateAfterValidator()],
      event_time : [],
      referentiels_id : [[0], Validators.required],
      user_id : [""],
  })

  ngOnInit(){
    const param = this.route.snapshot.paramMap.get('idEvent');
    if (param) {
      this.params = +param
    }
    this._fetchData()
    this.getReferentiels()
  }
  private _fetchData() {
    if (this.params) {
        this.eventService.getEventById(this.params).subscribe({
          next : (data)=>{
            console.log(data.data.apprenants);
            this.apprenants=data.data.apprenants
            this.eventSelected=data.data;
            this.patchValueEvent(this.eventSelected)
            const appElements: Apprenant[] = [];
            data.data.apprenants.forEach((item: Apprenant) => {
                const periodicElement : Apprenant = {
                    id: item.id,
                    matricule: item.apprenant.matricule,
                    nom: item.apprenant.nom,
                    prenom: item.apprenant.prenom,
                    email: item.apprenant.email,
                    date_naissance: item.apprenant.date_naissance,
                    lieu_naissance: item.apprenant.lieu_naissance,
                    genre: item.apprenant.genre,
                    telephone: item.apprenant.telephone,
                    photo: item.apprenant.photo,
                    is_active: item.apprenant.is_active,
                    isPresent: item.isPresent,
                };
                appElements.push(periodicElement);
            });
            this.dataSource.data=appElements
            // return appElements;
          }

        });  
    }
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (event.key === 'Enter') {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.filteredData.length == 1) {
            const id = this.dataSource.filteredData[0].id;
            const currentUrl = this.router.url;
            const targetUrl = `${currentUrl}/detail/${id}`;
            this.router.navigateByUrl(targetUrl);
        }
    }
  }
  patchValueEvent(data : Event){    
    this.formEvent.get('subject')?.setValue(data.subject)
    this.formEvent.get('description')?.setValue(data.description)
    this.formEvent.get('event_date')?.setValue(data.event_date+'T'+data.event_time)
    this.formEvent.get('referentiels_id')?.setValue(data.referentiels!.map((ref:Referentiel)=>ref.id!));    
  }
  getReferentiels(){
    this.refService.getReferentiels().subscribe(referentiels =>{
        this.referentiels=referentiels;
    })
  }
  clickPresence(event : any, element:Apprenant){
    element.isPresent=event.checked
    
  }
}
function   dateAfterValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    
    const date  = control.value;;
    
    if(!date) {
      return null;
    }
    
    const dateValue = new Date(date);
    
    const now = new Date();
    
    if(dateValue < now) {
      return {
        dateAfter: true  
      };
    }
    
    return null;
  };

}