import {CarType} from './car-type';

export interface Car {
  id: number,
  typeCar: CarType,
  nameCar: string
  startPlace: string,
  endPlace: string,
  phone: string,
  email: string,
  timeStart: string,
  timeEnd: string,
  isDeleted: boolean
}
