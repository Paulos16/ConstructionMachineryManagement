import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DefinitionTask } from '../models/definition-task';

@Injectable({
  providedIn: 'root'
})
export class DefinitionTasksService {
  private definitionTasksUrl = 'http://localhost:5000/api/zleceniaDefinicji';

  constructor(
    private http: HttpClient
  ) { }

  getDefinitionTasks(): Observable<DefinitionTask[]> {
    return this.http.get<DefinitionTask[]>(this.definitionTasksUrl)
      .pipe(
        catchError(this.handleError<DefinitionTask[]>('getDefinitionTasks', []))
      );
  }

  addNewDefinitionTask(idRodzajMaszyny: number): Observable<DefinitionTask> {
    let body = { IdRodzajMaszyny: idRodzajMaszyny };

    return this.http.put<DefinitionTask>(this.definitionTasksUrl, body)
      .pipe(
        tap(() => alert('Zlecenie utworzenia dokumentu definicji zadań przeglądowych przesłane pomyślnie.')),
        catchError(this.handleError<DefinitionTask>('addNewDefinitionTask'))
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
