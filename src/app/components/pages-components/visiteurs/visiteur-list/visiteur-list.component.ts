import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/components/authentication/shared/services/auth.service';



import Swal from 'sweetalert2';



import { Visiteur } from '../shared/visiteur.model';
import { VisiteurService } from '../shared/visiteur.services';
import { VisiteurAddDialogComponent } from '../visiteur-add-dialog/visiteur-add-dialog.component';


@Component({
  selector: 'app-visiteur-list',
  templateUrl: './visiteur-list.component.html',
  styleUrls: ['./visiteur-list.component.scss'],

})
export class VisiteurListComponent {
  displayedColumns: string[] = [ 'nom', 'prenom', 'INE', 'motif', 'actions'];
  dataSource = new MatTableDataSource<Visiteur>([]);
  selection = new SelectionModel<Visiteur>(true, []);
  refId: any;
  promo: number = 0;
  ref: number = 0;
  userRole: boolean;
 
  


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
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
    constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private visiteurService: VisiteurService,
      private route: ActivatedRoute,
      public dialog: MatDialog,
      public authService : AuthService

  ) { }




toggleTheme() {
    this.themeService.toggleTheme();
}

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

ngOnInit(): void {

    
    
    this.visiteurService.visiteurUpdate.subscribe(() => {
      this.visiteurService.getVisiteurs().pipe(
        map((data: any) => {
            
            
            
            const visiteurElements: Visiteur[] = [];
            data.data.forEach((item: Visiteur) => {
                const periodicElement: Visiteur = {
                    id: item.id,
                    nom: item.nom,
                    prenom: item.prenom,
                    INE: item.INE,
                    motif: item.motif,
                };
                visiteurElements.push(periodicElement);
            });
            return visiteurElements;
        })
    ).subscribe(visiteurElements => {
        ELEMENT_DATA = visiteurElements;
        this.dataSource.data = ELEMENT_DATA;
    });

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
      });

    this.visiteurService.getVisiteurs().pipe(
        map((data: any) => {
            
            
            
            const visiteurElements: Visiteur[] = [];
            data.data.forEach((item: Visiteur) => {
                const periodicElement: Visiteur = {
                    id: item.id,
                    nom: item.nom,
                    prenom: item.prenom,
                    INE: item.INE,
                    motif: item.motif,
                };
                visiteurElements.push(periodicElement);
            });
            return visiteurElements;
        })
    ).subscribe(visiteurElements => {
        ELEMENT_DATA = visiteurElements;
        this.dataSource.data = ELEMENT_DATA;
    });

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.userRole = this.authService.isSuperAdmin();

}

ngAfterViewInit() {

  this.visiteurService.getVisiteurs().pipe(
      map((data: any) => {
          const visiteurElements: Visiteur[] = [];
          data.data.forEach((item: Visiteur) => {
              const periodicElement: Visiteur = {
                  id: item.id,
                  nom: item.nom,
                  prenom: item.prenom,
                  INE: item.INE,
                  motif: item.motif,
              };
              visiteurElements.push(periodicElement);
          });
          return visiteurElements;
      })
  ).subscribe(visiteurElements => {
      ELEMENT_DATA = visiteurElements;
      this.dataSource.data = ELEMENT_DATA;
  });

  this.dataSource.paginator = this.paginator;

  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 toggleAllRows() {
  if (this.isAllSelected()) {
      this.selection.clear();
      return;
  }
  this.selection.select(...this.dataSource.data);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: Visiteur): string {
  if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom + 1}`;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

/** Announce the change in sort state for assistive technology. */
announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
      this._liveAnnouncer.announce('Sorting cleared');
  }
}

openCreateVisiteurDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(VisiteurAddDialogComponent, {
        width: '1200px',
        enterAnimationDuration,
        exitAnimationDuration
    });
    
    
}

}

let ELEMENT_DATA: Visiteur[] = []