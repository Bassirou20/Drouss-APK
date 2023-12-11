import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { UserService } from '../shared/utilisateur.service';
import { User } from '../shared/utilisateur.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    showUserInfo = false;
    users: User[] = []; 
    selectedUser: any;

    imgRef: any = "assets/img/useravatar.png";
    showAddForm = false;
    imgUser: any = "assets/img/useravatar.png";

  constructor(
    public themeService: CustomizerSettingsService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.getUsers(); 
  }
  selectUser(user: User): void {
   
      this.showUserInfo = !this.showUserInfo;
      this.selectedUser = user;
    
  }
  getUsers(): void {
    this.userService.getUsers().pipe(
      tap((response: any) => {
        this.users = response.data as User[]; 
        console.log('users', this.users);
      }),
      catchError((error: any) => {
        console.log('Une erreur est survenue lors de la récupération des utilisateurs :', error);
        return of(null); 
      })
    ).subscribe();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

}
