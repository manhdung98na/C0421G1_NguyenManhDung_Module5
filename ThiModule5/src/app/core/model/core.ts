import {Part} from './part';

export interface Core {
  id: string,
  movie: Part,
  date: string,
  tickets: number,
  isDeleted: boolean
}
