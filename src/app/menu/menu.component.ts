import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public error: string;

  constructor(
    public sharedService: SharedService,
    public loginService: LoginService,
    public router:Router) { }

  /**
   * initialise la variable isConnected à false
   */
  ngOnInit() {
    this.sharedService.isConnected = false;
  }

  /**
   * Déconnecte l'utilisateur
   * passe la variable isConnected du SharedService à false
   * redirige vers la page home
   */
  logout(): void{
    this.loginService.logout().subscribe(
      () => {
        this.sharedService.isConnected = false;
        this.router.navigate(['/home']);
      },
      (error) => { this.error = error.error.message}
    );

  }


}
