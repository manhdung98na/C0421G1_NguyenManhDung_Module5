import {Part} from './part';

export interface Core {
  id: number,
  typeCar: Part,
  nameCar: string
  startPlace: string,
  endPlace: string,
  phone: string,
  email: string,
  timeStart: string,
  timeEnd: string,
  isDeleted: boolean
}
