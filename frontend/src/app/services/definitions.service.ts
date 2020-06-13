import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Definition } from '../models/definition';

@Injectable({
  providedIn: 'root'
})
export class DefinitionsService {
  private definitionsUrl = 'http://localhost:5000/api/definicje';

  constructor(
    private http: HttpClient
  ) { }

  getDefinitions(): Observable<Definition[]> {
    return this.http.get<Definition[]>(this.definitionsUrl)
      .pipe(
        catchError(this.handleError<Definition[]>('getDefinitions', []))
      );
  }

  addNewDefinition(idRodzajMaszyny: number, dokument: string): Observable<Definition> {
    let body = { IdRodzajMaszyny: idRodzajMaszyny, Dokument: dokument };

    return this.http.put<Definition>(this.definitionsUrl, body)
      .pipe(
        tap(() => alert('Dokument definicji zadań przeglądowych przesłany pomyślnie.')),
        catchError(this.handleError<Definition>('addNewDefinition'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert('Error: ' + error.message);
      return of(result as T);
    }
  }
}
