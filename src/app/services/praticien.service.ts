import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PraticienService {
  public gsbAPI: string = 'http://localhost/gsbNAPI/public/api/';
  private api_token: string = this.sharedService.user.remember_token;
  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.api_token});
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }

  getPraticien(id_praticien: number): Observable<any>{
    return this.httpClient.get(this.gsbAPI+'praticien/'+id_praticien, {headers: this.headers});
  }
  getPraticiens(): Observable<any>{
    return this.httpClient.get(this.gsbAPI+ 'praticiens', {headers: this.headers});
  }

  /**
   * Fonction qui récupère la liste des praticiens dont la spécialité correspond à l'id_specialite en paramètre
   * @param id_specialite
   */
  getPratBySpec(id_specialite: number): Observable<any> {
    return this.httpClient.get(this.gsbAPI+ 'praticiens/specialite/'+id_specialite, {headers: this.headers});
  }
  /**
   * Fonction qui récupère les praticiens dont le nom est en paramètre
   * @return un observable : listes de praticien(s)
   */
  getPratByName(nom_praticien: String): Observable<any> {
    return this.httpClient.get(this.gsbAPI+ 'praticiens/'+ nom_praticien, {headers: this.headers });
  }
}
