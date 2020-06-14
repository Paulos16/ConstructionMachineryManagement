import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { InspectionTask } from '../models/inspection-task';

@Injectable({
  providedIn: 'root'
})
export class InspectionTasksService {
  private inspectionTasksUrl = 'http://localhost:5000/api/zleceniaPrzegladow';

  constructor(
    private http: HttpClient
  ) { }

  getInspectionTasks(): Observable<InspectionTask[]> {
    return this.http.get<InspectionTask[]>(this.inspectionTasksUrl)
      .pipe(
        catchError(this.handleError<InspectionTask[]>('getInspectionTasks', []))
      );
  }

  addNewInspectionTask(idMaszyna: number, dokument: string): Observable<InspectionTask> {
    let body = { IdMaszyna: idMaszyna, Dokument: dokument };

    return this.http.put<InspectionTask>(this.inspectionTasksUrl, body)
      .pipe(
        tap(() => alert('Zlecenie utworzenia dokumentu zadań przeglądowych przesłane pomyślnie.')),
        catchError(this.handleError<InspectionTask>('addNewInspectionTask'))
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
