import {RentType} from './rent-type';

export interface Service {
  id: string;
  name: string;
  area: number;
  floors: number;
  maxPeople: number;
  cost: number;
  rentType: RentType;
  isAvailable: boolean;
  isDeleted: boolean;
}
