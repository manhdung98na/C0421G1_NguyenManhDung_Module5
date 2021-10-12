import {Division} from './division';
import {Position} from './position';
import {EducationDegree} from './education-degree';

export interface Employee {
  id: number;
  name: string;
  division: Division;
  position: Position;
  educationDegree: EducationDegree;
  birthday: string;
  idCard: string;
  salary: number;
  phone: string;
  email: string;
  address: string;
  isDeleted: boolean;
}
