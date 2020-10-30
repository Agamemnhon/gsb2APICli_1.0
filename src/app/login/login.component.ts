import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public title: String;
  public error: String;
  public user: User;
  constructor(
    private sharedService: SharedService,
    private router:Router,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.user = new User();
  }

  /**
   * Envoie les données saisies par l'utilisateur si les données sont valides, enregistre
   * les données de retour du serveur dans la variable user du SharedService notamment le remember_token
   * pour l'authentification
   *
   * Sinon renvoie l'erreur transmise par le serveur
   */
  login(): void {
    this.loginService.getUser(this.user).subscribe(
      (user) => {
        this.user = user;
        this.sharedService.isConnected = true;
        this.sharedService.user = this.user;

        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = error.error.message;
      }
    );

  }




}
