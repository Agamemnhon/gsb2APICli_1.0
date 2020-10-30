import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from '../models/specialite';
import { PraticienService } from '../services/praticien.service';
import { SpecialiteService } from '../services/specialite.service';

@Component({
  selector: 'app-prat-by-spec',
  templateUrl: './prat-by-spec.component.html'
})
export class PratBySpecComponent implements OnInit {

  public title: String;
  public id_specialite: number;
  public specialite: Specialite;
  public specialites : Specialite[];
  public error: String;

  constructor(
    private router:Router,
    private specialiteService: SpecialiteService,
    private praticienService: PraticienService
    ) { }

  ngOnInit(): void {
    this.title="Choix d'une spécialité";
    this.specialite= new Specialite();
    this.getSpecialites();
  }

  /**
   * Vérifie qu'il existe des praticiens possedant la spécialité et
   * si c'est le cas redirige l'utilisateur vers la liste
   * sinon renvoie une erreur
   * @param id_specialite
   */
  specSelected(id_specialite: number):void {
    this.id_specialite = id_specialite;
    this.praticienService.getPratBySpec(this.id_specialite).subscribe(
      () => {
        this.router.navigate(['/getPraticiens/bySpec/' + id_specialite]);
        },
      ()=>{ this.error = "Il n'existe aucun praticien ayant cette spécialité !";}
    );

  }

  /**
   * Charge la liste des specialités pour la liste déroulante
   */
  getSpecialites():void {
    this.specialite=new Specialite();
    this.specialiteService.getSpecialites().subscribe(
      (specialites) => { this.specialites = specialites;},
      (error) => { this.error = error.message; }
    );
  }

}
