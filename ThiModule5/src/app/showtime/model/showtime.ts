import {Movie} from './movie';

export interface Showtime {
  id: string,
  movie: Movie,
  date: string,
  tickets: number,
  isDeleted: boolean
}
