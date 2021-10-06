import {Component, OnInit} from '@angular/core';
import {DictionaryService} from "../service/dictionary.service";
import {Word} from "../model/word";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.css']
})
export class DictionaryPageComponent implements OnInit {
  words: Word[];

  constructor(private dictionaryService: DictionaryService, private router: Router) {
  }

  ngOnInit(): void {
    this.words = this.dictionaryService.getAll();
  }
}
