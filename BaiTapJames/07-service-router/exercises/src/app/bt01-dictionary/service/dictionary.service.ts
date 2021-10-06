import {Injectable} from '@angular/core';
import {Word} from "../model/word";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  wordArray: Word[] = [
    {
      word: 'house',
      mean: 'ngôi nhà'
    },
    {
      word: 'horse',
      mean: 'con ngựa'
    },
    {
      word: 'car',
      mean: 'xe ô tô'
    },
    {
      word: 'computer',
      mean: 'máy vi tính'
    },
    {
      word: 'develop',
      mean: 'phát triển'
    }
  ]

  constructor() {
  }

  getAll(): Word[] {
    return this.wordArray;
  }

  translate(s: string): Word {
    let w = this.wordArray.find(item => item.word == s.toLowerCase());
    return w ? w : null;
  }
}
