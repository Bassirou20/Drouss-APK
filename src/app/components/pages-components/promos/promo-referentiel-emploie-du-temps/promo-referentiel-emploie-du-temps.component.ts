import { Component, Input, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { MatDialog } from '@angular/material/dialog';
import { AddEmploieDuTempsComponent } from './add-emploie-du-temps/add-emploie-du-temps.component';
import { EmploieDuTempsService } from '../shared/emploie-du-temps.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EmploieDutemps } from '../shared/emploie-dutemps';
import Swal from 'sweetalert2';
import { PromoService } from '../shared/promo.service';



function colorEvent(date : Date):string{
  let today = new Date()
  date = new Date(date)
  let diffEnJours= Math.floor((date.getTime()-today.getTime())/(1000*60*60*24));
  if (diffEnJours<0){
      return 'grey';
  }
  else if (diffEnJours >=0 && diffEnJours<5) {
      return 'green';
  }
  else if(diffEnJours>5 && diffEnJours<10){
      return '#FFD700'
  }
  return 'red'
}

@Component({
  selector: 'app-promo-referentiel-emploie-du-temps',
  templateUrl: './promo-referentiel-emploie-du-temps.component.html',
  styleUrls: ['./promo-referentiel-emploie-du-temps.component.scss']
})
export class PromoReferentielEmploieDuTempsComponent {

  constructor(public dialog: MatDialog, private emploieService: EmploieDuTempsService,
              public promoService : PromoService
    ) {}

  AjoutDisabled = false;
  @Input() promo! : number;
  @Input() ref! : number;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  coursCalendar :any[]= [];
  allCours : EmploieDutemps;
  promoActuel :number=0;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: frLocale,
    weekends : false,
    events : this.coursCalendar,
    eventColor : '#F4C584',
    plugins: [dayGridPlugin, timeGridPlugin],
    slotMinTime: "08:00:00",
    slotMaxTime: "16:00:00",
    allDaySlot: false,
    expandRows: true,
    height: '50em',

    eventClick : this.clickEvent.bind(this),
    
    eventContent : function (info) {
      
      let eventElement = document.createElement("div");      
      
      eventElement.innerHTML = `<span>${info.event.title}<br> ${info.timeText}</span>`;
      eventElement.style.cursor="pointer"
      eventElement.style.fontSize="18px"
      eventElement.style.color="white"
      eventElement.style.display="block"
      eventElement.style.textAlign="center"
      eventElement.style.alignContent="center"

      let eventEls= [eventElement]
      return {
          domNodes: eventEls
      }
    },
  };
  ngOnInit(){
    this.getPromoActuel()

    this.getAllCours();
  }
  getPromoActuel(){
    this.promoService.getPromoActuel().subscribe({
      next :(value)=> {
        this.promoActuel=value;  
        if (this.promo!=this.promoActuel) {
          this.AjoutDisabled=true;
        }      
      },
    })
  }

  clickEvent(infos : any){
    if (new Date(infos.el.fcSeg.eventRange.range.start).setSeconds((24*60*60)-10*60)>new Date().getTime()) {
      let id = infos.event._def.publicId
      let cours = this.getCoursById(this.coursCalendar,id)    
      this.openDialog('500ms', '250ms', cours)  
    }
  }
  getCoursById(tab :any[],coursId: number){
    return tab.find(e=>e.id==coursId)
  }
  actualiseEvents(){
    this.calendarComponent.getApi().removeAllEvents()
    this.calendarComponent.getApi().addEventSource(this.coursCalendar);
  }
  pushEvent(tab :any, element :any){
      tab.push(element);
  }

  constructEvent(title : string, dateDeb :string, dateFin : string,bgColor : string, id ? : number){
      return {
          id : id,
          title : title,
          start : dateDeb,
          end : dateFin,
          backgroundColor : bgColor,
          borderColor : bgColor
      }
  }
  
  successAlert(description:string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: description,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  wrongAlert(description:string) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: description,
    })
  }
  changeColorDate(date :Date): string{
    if (new Date(date).setSeconds(24*60*60)< new Date().getTime()) {
      return '#DCDCDC';
    }
      return '#66CDAA';
    
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, cours? : any): void {
    const dialogRef=this.dialog.open(AddEmploieDuTempsComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data : cours
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        if (result.action=="Ajout") {
          this.ajouterCours(result.data); 
        }
        else if(result.action=="Edit"){
          this.editCours(result.data, result.data.id);
        }
        else{
          this.supprimerCours(result.data)   
        }
        
      }
    })
  }

  getAllCours(){
    this.emploieService.getCours(this.ref,this.promo).subscribe({
      next : (data)=>{
        this.coursCalendar= data.data.map((cours : EmploieDutemps)=>{
            // this.changeColorDate(cours.date_cours);
            return this.constructEvent(cours.nom_cours, cours.date_cours+' '+cours.heure_debut, cours.date_cours+' '+cours.heure_fin,this.changeColorDate(cours.date_cours), cours.id)
        })
        this.calendarOptions.events=this.coursCalendar;
      }
    })
  }

  ajouterCours(data : {}){
    let idPromo =this.promo
    let idRef = this.ref
    let prof_id = JSON.parse (localStorage.getItem("user")!).id
    let obj = {...data,idPromo,idRef,prof_id}
    this.emploieService.postCours(obj).subscribe({
      next : (response)=>{
          let data = response.data as EmploieDutemps
          let cours=this.constructEvent(data.nom_cours, data.date_cours+' '+data.heure_debut, data.date_cours+' '+data.heure_fin,this.changeColorDate(data.date_cours),data.id);
          this.coursCalendar.push(cours);
          this.actualiseEvents()
          this.successAlert("Cours ajouté avec succés !")
      },
      error : (error)=>{
        this.wrongAlert("erreur lors de l'ajout")
      }
    })
    
  }
  editCours(body : EmploieDutemps, id : number) {
    let idPromo =this.promo
    let idRef = this.ref
    let prof_id = JSON.parse (localStorage.getItem("user")!).id
    let obj = {...body,idPromo,idRef,prof_id}
    
    this.emploieService.editCours(obj, id).subscribe({
      next : (data)=>{
        let res = data.data as EmploieDutemps
        let coursIn=this.constructEvent(res.nom_cours, res.date_cours+' '+res.heure_debut, res.date_cours+' '+res.heure_fin,this.changeColorDate(res.date_cours),res.id)
        let coursOut=this.getCoursById(this.coursCalendar,id)
          
        let indexOut= this.coursCalendar.indexOf(coursOut)
        
        this.coursCalendar.splice(indexOut,1,coursIn)
        this.actualiseEvents()
        this.successAlert("Cours modifié avec succés !")
      },
      error : (error)=>{
        this.wrongAlert("erreur lors de la modification")
      }
    })
  }
  supprimerCours(id : number){
    this.emploieService.deleteCours(id).subscribe({
        next : (data)=>{
            this.coursCalendar= this.coursCalendar.filter(cours=>cours.id !== data.data.id)
            this.successAlert("Cours supprimé avec succés !")
            this.actualiseEvents()
        },
        error : (error)=>{
        this.wrongAlert('erreur lors de la suppression')
        }
  })
}
}
