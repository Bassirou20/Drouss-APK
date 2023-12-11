import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReferentielService } from '../../referentiels/services/referentiel.service';
import { Referentiel } from '../../referentiels/services/referentiel.model';
import frLocale from '@fullcalendar/core/locales/fr';
import { AbstractControl, FormBuilder,ValidatorFn, Validators } from '@angular/forms';
import { Event } from '../services/event';
import { EventService } from '../services/event.service';

import Swal from 'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router } from '@angular/router';

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
    else if(diffEnJours>=5 && diffEnJours<10){
        return '#FFD700'
    }
    return 'red'
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
    eventsCalendar : any[]=[]
    infosEvent : Event
    allRef : Referentiel[] = [];
    allEvents : Event[] = [];
    eventSelected : Event
    // eventsAnnules: number []=[]
    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    calendarOptions: CalendarOptions = {
        locale: frLocale,
        initialView: 'dayGridMonth',
        weekends: true,
        eventClick : this.clickEvent.bind(this),
        events: this.eventsCalendar,
        eventContent : function (info) {
            
            let eventElement = document.createElement("div");
            eventElement.innerHTML = `<span>${info.event.title}</span>`;
            eventElement.style.color= colorEvent(info.event.start!)
            eventElement.style.cursor="pointer"
            eventElement.style.textAlign="center"
            eventElement.style.fontSize="16px"

            let eventEls= [eventElement]
            return {
                domNodes: eventEls
            }
        },
        
        plugins: [dayGridPlugin]
    };


    constructor(
        public dialog: MatDialog, private refService : ReferentielService,
        private eventService : EventService,
        private router : Router
    ) {}

    ngOnInit(){
        this.getReferentiels()
        this.getEvents()
        this.eventService.selectedEvent = this.eventService;

        // this.eventsAnnules=JSON.parse(localStorage.getItem("annules")!) || [];
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
    getEventById(tab :any[],eventId: number){
        return tab.find(e=>e.id==eventId)
    }
    actualiseEvents(){
        this.calendarComponent.getApi().removeAllEvents()
        this.calendarComponent.getApi().addEventSource(this.eventsCalendar);
    }
    pushEvent(tab :any, element :any){
        tab.push(element);
    }
    constructEvent(title : string, date :Date, id ? : number){
        return {
            id : id,
            title : title,
            date : date
        }
    }
    clickEvent(info :any) {
        let id = info.event._def.publicId
        let donnee=this.allEvents.find(event => event.id==id);

        this.router.navigate(["pages/events/details", id]);  

    }
    getReferentiels(){
        this.refService.getReferentiels().subscribe(referentiels =>{
            this.allRef=referentiels;
        })
    }
    getEvents(){
        this.eventService.getEvents().subscribe(data =>{
            this.allEvents=data.data;
         this.eventsCalendar= this.allEvents.map(event => {
             if (event.is_active==0) {
                return {
                    id : event.id,
                    title : `<span style="text-decoration: line-through;">${event.subject}</span>`,
                    date : event.event_date,
                }
            }
                return {
                    id : event.id,
                    title : event.subject,
                    date : event.event_date,
                }
            })    
        this.calendarOptions.events=this.eventsCalendar;
    });
    }
    addEvent(infosEvent : Event){
        this.eventService.addEvent(infosEvent).subscribe({
            next : (data)=>{
                let event = this.constructEvent(data.data.subject, data.data.event_date, data.data.id);
                this.eventsCalendar.unshift(event);
                this.allEvents.push(data.data);
                this.successAlert("Ajout effectué avec succès !");
                this.actualiseEvents();
            },
            error : (error)=>{
                this.wrongAlert("Erreur lors de l'ajout");
            }
        })
    }
    
    editEvent(infosEvent : Event,id : number){
        this.eventService.editEvent(infosEvent,id).subscribe( {
            next: (data) => {
                let event = this.constructEvent(data.data.subject,data.data.event_date,data.data.id);
                let eventAmod= this.getEventById(this.eventsCalendar,event.id!);
                let index= this.eventsCalendar.indexOf(eventAmod);
                // let indexEvent=this.allEvents.indexOf(infosEvent);
                             
                this.eventsCalendar.splice(index,1,event); 
                this.allEvents.splice(index,1,data.data); 

                this.actualiseEvents()
                this.successAlert("Modification effectuée avec succès"); 
            },
            error: (error) => {
                this.wrongAlert("Erreur lors de la modification.");
            }
        }) 
    }
    annulerEvent(id : number){
        this.eventService.annulerEvent(id).subscribe( {
            next : (data)=>{
                let eventAnnule =this.getEventById(this.allEvents,id);
                let evente=this.getEventById(this.eventsCalendar,id)

                evente.title=`<span style="text-decoration: line-through;">${eventAnnule.subject}</span>` 
                this.actualiseEvents()
                this.successAlert('Cet évènement a été annulé.')
            },
            error : (error)=>{
                this.wrongAlert("Erreur lors de l'annulation")
            }
        })
    }
    supprimerEvent(id : number){
        this.eventService.deleteEvent(id).subscribe({
            next : (data)=>{
                this.eventsCalendar= this.eventsCalendar.filter(event=>event.id !== data.data.id)
                this.actualiseEvents()
            },
            error : (error)=>{
            this.wrongAlert('erreur lors de la suppression')
            }
      })
    }
    restoreEvent(id : number){
        this.eventService.restoreEvent(id).subscribe({
            next : (data)=>{
                let event= this.getEventById(this.allEvents, id)!
                let evente=this.eventsCalendar.find(e=>e.id==event.id)
                 
                evente.title=event.subject
                this.actualiseEvents()
                this.successAlert("Evenement restauré avec succès");
            },
            error : (error)=>{
                this.wrongAlert("Error lors de la restauration de l'évènement")
            }
        });
    }

    
    openAddEventDialog(enterAnimationDuration: string, exitAnimationDuration: string,event? : Event): void {
       const dialogRef= this.dialog.open(AddEventDialogBox, {
            width: '800px',
            enterAnimationDuration,
            exitAnimationDuration,
            data : {referentiels : this.allRef, event : event}
        });
        
        dialogRef.afterClosed().subscribe(result => {
            
            if (result) {
                
                this.infosEvent = result.eventSender;
                if (result.action=='Ajout') {
                    this.addEvent(this.infosEvent) 
                }
                else if (result.action=='Edit') {
                    this.editEvent(this.infosEvent,this.infosEvent.id!);
                }else if(result.action=='Restore'){
                    this.restoreEvent(result.id)
                }
                else if(result.action=='Supp') {
                    this.supprimerEvent(result.id)
                }
                else{
                    this.annulerEvent(result.id);
                }
            }
          
        });
    }
}

@Component({
    selector: 'add-event-dialog',
    templateUrl: './add-event-dialog.html',
})
export class AddEventDialogBox {

    constructor(
        private fb : FormBuilder,
        public dialogRef: MatDialogRef<AddEventDialogBox>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private eventService : EventService
    ) {}
    actionEvent:string="Ajout"
    formEvent=this.fb.group({
        subject : ["", [Validators.required]],
        description : ["",[Validators.required]],
        event_date : ["",dateAfterValidator()],
        event_time : [],
        referentiels_id : ["", Validators.required],
        user_id : [""],
    })
  
    ngOnInit(){
       this.patchValueEvent()
    }
    patchValueEvent(){
        if (this.data.event) {
            this.formEvent.get('subject')?.setValue(this.data.event.subject)
            this.formEvent.get('description')?.setValue(this.data.event.description)
            this.formEvent.get('event_date')?.setValue(this.data.event.event_date+'T'+this.data.event.event_time)
            this.formEvent.get('referentiels_id')?.setValue(this.data.event.referentiels.map((ref:Referentiel)=>ref.id));
            
            if (this.data.event.is_active==1) {
                this.actionEvent="Edit"
            } 
            else{
                this.actionEvent="Annule"
            }   
        }
    }
    close(){
        this.dialogRef.close();
    }
    validerEvent(){        
        if (this.actionEvent=="Ajout") {
            this.ajoutEvent();
        }
        else if (this.actionEvent=="Edit") { 
            this.editEvent()
        }
    }
    
    editEvent(){
        let  date_time=this.formEvent.get('event_date')?.value?.split("T")        
        let  event_date= date_time![0]
        let  event_time= date_time![1]
        let eventSender={
            id : this.data.event.id,
            subject : this.formEvent.get('subject')?.value,
            description : this.formEvent.get('description')?.value,
            event_date : event_date,
            event_time : event_time,
            referentiels_id : this.formEvent.get('referentiels_id')?.value,
            user_id : JSON.parse (localStorage.getItem("user")!).id
        }
        let  dataSender={eventSender :eventSender,action : this.actionEvent }
        this.actionEvent="Edit"
   
        this.dialogRef.close(dataSender);
    }
    ajoutEvent(){
        let  date_time=this.formEvent.get('event_date')?.value?.split("T")        
        let  event_date= date_time![0]
        let  event_time= date_time![1]
        let  eventSender={
            subject : this.formEvent.get('subject')?.value,
            description : this.formEvent.get('description')?.value,
            event_date : event_date,
            event_time : event_time,
            referentiels_id : this.formEvent.get('referentiels_id')?.value,
            user_id : JSON.parse (localStorage.getItem("user")!).id,
            
        }
        
        let   dataSender={eventSender :eventSender,action : this.actionEvent }

        this.actionEvent="Ajout"
        this.dialogRef.close(dataSender);
    }
    removeEvent(action :string,motif :string){
        // this.actionEvent=action
        Swal.fire({
            title: 'Etes vous sûr de vouloir ' +motif+ ' cet évènement ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, je confirme!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.actionEvent=action
                if (this.actionEvent=='Restore') {
                    this.data.event.is_active=1
                }
                else{
                    this.data.event.is_active=0
                }
                let dataSender= { id :this.data.event.id, action : this.actionEvent }
                this.dialogRef.close(dataSender);   
            }
        })
    }
    restoreEvent(event : Event){
        this.actionEvent="Restore"
        let dataSender= { id :event.id, action : this.actionEvent}
        this.dialogRef.close(dataSender);   
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
