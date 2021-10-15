import {CarType} from './car-type';

export interface Car {
  id: number,
  typeCar: CarType,
  name: string,
  startPlace: string,
  endPlace: string,
  phone: string,
  email: string,
  timeStart: string,
  timeEnd: string,
  deleted: boolean
}
