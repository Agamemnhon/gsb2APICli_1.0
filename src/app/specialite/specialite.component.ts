import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from '../models/specialite';
import { SharedService } from '../services/shared.service';
import { SpecialiteService } from '../services/specialite.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html'
})
export class SpecialiteComponent implements OnInit {
  public title: String;
  public error: String;
  public specialite: Specialite;
  public specialites: Specialite[];
  public readonly: String;
  @Input() public id_specialite: number;
  @Output() private onChoose= new EventEmitter();

  constructor(
    private router: Router,
    private specialiteService: SpecialiteService

  ) { }

  ngOnInit(): void {
    this.getSpecialites();
  }

  /**
   * Fonction qui récupère la liste des spécialités de la table pour générer la liste déroulante
   */
  getSpecialites():void {
    this.specialite=new Specialite();
    this.specialiteService.getSpecialites().subscribe(
      (specialites) => { this.specialites = specialites; },
      (error) => { this.error = error.message; }
    );
  }

  /**
   * Gestionnaire d'event_ On récupère l'id de la specialite et onChoose émet
   * un event avec cet id en paramètre
   * @param value l'id de la spec sélectionnée au format string
   */
  onChange(value: String) {
    this.id_specialite =+value;
    this.onChoose.emit(this.id_specialite);
  }
}
