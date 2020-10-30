import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posseder } from '../models/posseder';
import { Praticien } from '../models/praticien';
import { PossederService } from '../services/posseder.service';

@Component({
  selector: 'app-prat-specs-list',
  templateUrl: './prat-specs-list.component.html'
})
export class PratSpecsListComponent implements OnInit {
  public pratPossSpecs: Posseder[];
  public praticien: Praticien;
  public title: string;
  public error: string;
  public id_praticien :number;

  @Output() public reload = new EventEmitter();
  constructor(
    private possederService: PossederService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.praticien = new Praticien
    this.id_praticien = +this.activatedRoute.snapshot.paramMap.get('id_praticien');
    this.getPratPossSpecs(this.id_praticien);
  }

  /**
   *  Fonction qui récupère un Observable<Posseder[]> contenant un array des spécialités d'un praticien
   * @param id_praticien
   */
  getPratPossSpecs(id_praticien: number){
    this.possederService.getPosseder(id_praticien,0).subscribe(
      (posseder) => {
        this.pratPossSpecs = posseder;
      },
      (error) => { this.error = error.error.message}
    );
  }

  /**
   *  Fonction qui dirige vers le formulaire de modification d'une spécialité
   * @param id_praticien
   * @param id_specialite
   */
  detail(id_praticien: number, id_specialite: number){
    this.router.navigate(['updateSpecialite/'+id_praticien+'/'+id_specialite]);
  }

  /**
   * Fonction qui efface une spécialité à un Praticien
   * et recharge la liste des spécialités du Praticien
   * @param id_praticien
   * @param id_specialite
   */
  delete(id_praticien: number, id_specialite:number){
    this.possederService.deletePosseder(id_praticien, id_specialite).subscribe(
      () => {}, // l'api ne retourne rien donc rien à faire
      (error) => {
        this.error= error.error.message;
        alert(this.error);
      },
      () => {
        this.getPratPossSpecs(this.id_praticien);
      }
    )
  }
  /**
   *Fonction qui route vers le formulaire de posseder
   * @param id_praticien
   * @param id_specialite
   */
  addPosseder(id_praticien: number, id_specialite: number){
    this.router.navigate(['updateSpecialite/'+id_praticien+'/'+id_specialite]);
  }


}
