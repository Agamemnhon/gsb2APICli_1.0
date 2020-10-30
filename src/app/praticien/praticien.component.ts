import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Praticien } from '../models/praticien';

@Component({
  selector: 'app-praticien',
  templateUrl: './praticien.component.html'
})
export class PraticienComponent implements OnInit {
  public praticien : Praticien;
  public praticiens: Praticien[];
  @Input() public nom_praticien : String;
  @Output() private onValidate= new EventEmitter();
  public title : String;
  public error: String;

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.praticien = new Praticien();
    this.title = "Recherche d'un praticien par Nom";
  }

  cancel(){
    this.router.navigate(['/home']);
  }

  /**
   *  Fonction qui envoie le nom saisi par l'utilisateur
   * dans l'Event "onValidate" du DOM afin que celui-ci soit
   * récupéré et utilisaé par le pratByNameComponent
   * @param nom
   */
  validatePraticien(nom: String){
    this.nom_praticien = nom;
    this.onValidate.emit(this.nom_praticien);
  }

}
