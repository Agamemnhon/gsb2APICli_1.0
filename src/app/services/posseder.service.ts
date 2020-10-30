import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posseder } from '../models/posseder';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PossederService {

  private gsbAPI: string = 'http://localhost/gsbNAPI/public/api/';
  private api_token: string = this.sharedService.user.remember_token;
  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.api_token});
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }

  /**
   *  Fonction qui récupère un Observable<Posseder> qui contient l'ensemble des données du model Posseder ainsi
   * que les correspondances Praticien avec id_praticien et Specialite avec id_specialite
   * @param id_praticien
   * @param id_specialite
   */
  getPosseder(id_praticien: number, id_specialite:number):Observable<any>{
    return this.httpClient.get(this.gsbAPI+'posseders/'+id_praticien+'/'+id_specialite, {headers: this.headers});
  }
  /**
   * fonction qui efface une ligne de la table Posseder correspondant à l'association id_praticien et id_specialité
   * Comme la fonction delete du httpClient n'accepte que 2 paramètres maximum, il faut inclure le headers et un body contenant les
   * id_praticien et id_specialite de la ligne que l'on souhaite effacer
   */
  deletePosseder(id_praticien: number, id_specialite: number){
    let options={
      headers : this.headers,
      body: {
        "id_praticien": id_praticien,
        "id_specialite": id_specialite
      }
    }
    return this.httpClient.delete(this.gsbAPI+'posseders', options);
  }
  /**
   *  Fonction qui ajoute une ligne a la table Posseder
   * @param posseder
   */
  addPosseder(posseder: Posseder): Observable<any>{
    return this.httpClient.post(this.gsbAPI+'posseders',JSON.stringify(posseder), {headers: this.headers});
  }

  /**
   *  Fonction qui permet de mettre à jour une ligne de la table Posseder
   * @param posseder
   */
  updatePosseder(posseder: Posseder){
    return this.httpClient.put(this.gsbAPI+'posseders', JSON.stringify(posseder), {headers: this.headers});
  }


}
