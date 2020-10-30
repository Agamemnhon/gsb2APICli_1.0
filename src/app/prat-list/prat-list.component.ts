import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Praticien } from '../models/praticien';

@Component({
  selector: 'app-prat-list',
  templateUrl: './prat-list.component.html'
})
export class PratListComponent implements OnInit {
  @Input() public praticiens: Praticien[];
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  /**
   *  Fonction qui dirige l'utilisateur vers
   *  la page qui liste les spécialités d'un praticien
   * @param id_praticien
   */
  detail(id_praticien: number){
    this.router.navigate(['/detailPraticien/'+ id_praticien]);
  }

}
