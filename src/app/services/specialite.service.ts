import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private gsbAPI: string = 'http://localhost/gsbNAPI/public/api/';
  private api_token: string = this.sharedService.user.remember_token;
  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.api_token});

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }

  /**
   * Fonction qui renvoie la liste de toutes les spécialités de la table Specialite
   */
  getSpecialites(): Observable<any> {
    return this.httpClient.get(this.gsbAPI + 'specialites', {headers: this.headers});
  }
}
