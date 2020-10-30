import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Posseder } from '../models/posseder';
import { Praticien } from '../models/praticien';
import { PossederService } from '../services/posseder.service';
import { PraticienService } from '../services/praticien.service';

@Component({
  selector: 'app-posseder',
  templateUrl: './posseder.component.html'
})
export class PossederComponent implements OnInit {
  public posseder: Posseder;
  public praticien: Praticien;
  public pratPossSpecs: Posseder[];
  public error: string;
  public id_praticien: number;
  public id_specialite: number;
  public id_reference: number;
  public title: string;
  public booleanController: boolean;
  constructor(
    private possederService: PossederService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private praticienService: PraticienService
  ) { }

  ngOnInit(): void {
    this.posseder = new Posseder();
    this.praticien =new Praticien();
    this.id_praticien = +this.activatedRoute.snapshot.paramMap.get('id_praticien');
    this.id_specialite = +this.activatedRoute.snapshot.paramMap.get('id_specialite');
    this.id_reference = +this.activatedRoute.snapshot.paramMap.get('id_specialite');
    if (this.id_specialite > 0){
      this.title="Modification d'une Spécialité";
      this.getPosseder(this.id_praticien, this.id_specialite);
    } else {
      this.title="Ajouter une Spécialité";
      this.getPraticien(this.id_praticien);
      this.posseder.id_praticien = this.id_praticien;
      this.posseder.praticien = new Praticien();

    }

  }
  /**
   *
   * @param id_praticien
   * @param id_specialite
   */
  getPosseder(id_praticien: number, id_specialite: number){
    this.possederService.getPosseder(id_praticien, id_specialite).subscribe(
      (posseder: Posseder) => { this.posseder = posseder;},
      (error) => { this.error = error.error.message; }
    );
  }

  /**
   *  Redirige l'utilisateur vers la liste des spécialités d'un praticien
   * @param id_praticien
   */
  cancel(id_praticien:number){
    this.router.navigate(['/detailPraticien/' + id_praticien])
  }

  /**
   *  Validation du formulaire
   * si id_ref > 0 => update d'une spécialité existante
   * Sinon création d'une nouvelle spécialité
   * vérifie qu'une spécialité a été choisie
   *
   * @param id_ref
   */
  validatePosseder(id_ref: number){
    if(id_ref > 0 ) {
      if (isNaN(this.posseder.id_specialite)) {
        this.error = 'Vous devez selectionner une Spécialité !';
      } else {
          this.possederService.updatePosseder(this.posseder).subscribe(
          () => { this.router.navigate(['/detailPraticien/' +this.id_praticien]) },
          (error) => { this.error = error.error.message; }
          );
      }
    } else {
      this.possederService.addPosseder(this.posseder).subscribe(
        () => {},
        (error) => { this.error = error.error.message; },
        () => { this.router.navigate(['/detailPraticien/' +this.id_praticien]) }
      );
    }
  }

  /**
   *
   * @param id_spec Emet un Event de choix d'une spécialité
   */
  specSelected(id_spec: number){
    this.posseder.id_specialite = id_spec;
  }

  /**
   * Fonction qui dans le cas d'un ajout d'une spécialité à un praticien
   * récupère un Observable <Praticien> afin de remplir la variable this.posseder: Posseder
   * afin de pouvoir l'afficher sur le formulaire
   * @param id_praticien
   */
  getPraticien(id_praticien: number){
    this.praticienService.getPraticien(id_praticien).subscribe(
      (praticien) => {this.praticien = praticien;
        this.posseder.praticien.code_praticien = praticien.code_praticien;
        this.posseder.praticien.nom_praticien = praticien.nom_praticien;
        this.posseder.praticien.prenom_praticien = praticien.prenom_praticien; },
      (error) => {this.error = error.error.message;}
    )
  }

}
