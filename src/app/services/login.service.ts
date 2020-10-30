import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private gsbAPI: string= 'http://localhost/gsbNAPI/public/api/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
    ) { }

  getUser(user: User): Observable<any>{
    return this.httpClient.post(this.gsbAPI+ 'login', JSON.stringify(user), {headers: this.headers});
  }

  /**
   * Fonction qui envoie une demande de logout à l'API afin d'effacer le remember_token de la
   * table User
   */
  public logout(): Observable<any> {
    let api_token = this.sharedService.user.remember_token;
    this.headers = this.headers.set('Authorization', 'Bearer ' + api_token);
    return this.httpClient.get(this.gsbAPI + 'logout', {headers: this.headers});
  }
}
