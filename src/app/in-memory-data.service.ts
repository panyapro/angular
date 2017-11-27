import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const heroes = [
      {id: 1, name: 'Nyx'},
      {id: 2, name: 'Lina'},
      {id: 3, name: 'Shadow fiend'},
      {id: 4, name: 'Brewmaster'},
      {id: 5, name: 'IO'},
      {id: 6, name: 'Earthshaker'},
      {id: 7, name: 'Invoker'},
      {id: 8, name: 'Rubick'},
      {id: 9, name: 'Enigma'},
      {id: 10, name: 'Phantom Assasin'}
    ];
    return {heroes};
  }
}
