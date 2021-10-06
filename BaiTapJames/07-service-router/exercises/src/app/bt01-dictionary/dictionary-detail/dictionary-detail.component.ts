import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DictionaryService} from "../service/dictionary.service";
import {Word} from "../model/word";

@Component({
  selector: 'app-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.css']
})
export class DictionaryDetailComponent implements OnInit {
  word: Word;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dictionaryService: DictionaryService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let key = paramMap.get('word');
      this.word = this.dictionaryService.translate(key);
    })
  }
}
