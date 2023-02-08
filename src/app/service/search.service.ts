import { EventEmitter, Injectable } from '@angular/core';

export class SearchService {

  enteredTextSearchEvent = new EventEmitter<string>();
  constructor() { }
}
