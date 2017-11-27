import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError , map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hero } from './hero';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  /*
   * GET
   */
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_=> this.log(`fetched heroes id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`api/heroes/?name=${term}`);
  }
  /*
   * POST
   */
  updateHero(hero: Hero) {
    return this.httpClient.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`update hero ${hero.name}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_=> this.log(`delete hero ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
