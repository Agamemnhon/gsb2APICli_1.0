import { Praticien } from './praticien';
import { Specialite } from './specialite';

export class Posseder {
  public id_praticien: number;
  public id_specialite: number;
  public diplome: String;
  public coef_prescription: number;
  public praticien:Praticien;
  public specialite: Specialite;
}
