import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Inspection } from '../models/inspection';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService {
  private inspectionsUrl = 'http://localhost:5000/api/przeglady';

  constructor(
    private http: HttpClient
  ) { }

  getInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(this.inspectionsUrl)
      .pipe(
        catchError(this.handleError<Inspection[]>('getInspections', []))
      );
  }

  addNewInspectionToCorrect(idMaszyna: number, dokument: string): Observable<Inspection> {
    let body = { IdMaszyna: idMaszyna, Dokument: dokument };

    return this.http.put<Inspection>(this.inspectionsUrl, body)
      .pipe(
        tap(() => alert('Dokument przeglądu do poprawy przesłany pomyślnie.')),
        catchError(this.handleError<Inspection>('addNewInspectionToCorrect'))
      );
  }

  addNewCorrectInspection(idMaszyna: number, dokument: string): Observable<Inspection> {
    let body = { IdMaszyna: idMaszyna, Dokument: dokument };

    return this.http.put<Inspection>(this.inspectionsUrl, body)
      .pipe(
        tap(() => alert('Poprawny dokument przeglądu przesłany pomyślnie.')),
        catchError(this.handleError<Inspection>('addNewCorrectInspection'))
      );
  }

  editInspection(idPrzeglad: number, dokument: string): Observable<Inspection> {
    let body = { IdPrzeglad: idPrzeglad, Dokument: dokument };

    return this.http.patch<Inspection>(this.inspectionsUrl, body)
      .pipe(
        tap(() => alert('Dokument przeglądu zaktualizowany pomyślnie.')),
        catchError(this.handleError<Inspection>('editInspection'))
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
