import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PraticienService } from '../services/praticien.service';

@Component({
  selector: 'app-prat-by-name',
  templateUrl: './prat-by-name.component.html'
})
export class PratByNameComponent implements OnInit {
  public error:string;
  public title: String;
  public nom_praticien: String;
  constructor(
    private router: Router,
    private praticienService: PraticienService
  ) { }

  ngOnInit(): void {
    this.title = "Recherche d'un praticien par nom";
  }

  /**
   *  Fonction qui vérifie qu'un nom existe bien dans la BdD et dirige vers
   *  l'affichage de la liste
   *  sinon affiche une erreur
   * @param nom_praticien
   */
  nameValidate(nom_praticien: String){
    this.nom_praticien = nom_praticien;
    this.praticienService.getPratByName(this.nom_praticien).subscribe(
      () => {
          this.router.navigate(['/getPraticiens/byName/' + nom_praticien]);
        },
      ()=>{ this.error = "Il n'existe aucun praticien portant ce nom !";}
    );
  }

}
