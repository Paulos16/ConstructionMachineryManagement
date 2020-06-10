import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private applicationsUrl = 'http://localhost:5000/api/wnioski';

  constructor(
    private http: HttpClient
  ) { }

  getApplications() : Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationsUrl)
      .pipe(
        catchError(this.handleError<Application[]>('getApplications', []))
      );
  }

  addNewApplication(idRodzajMaszyny: number, rejestracja: string, tresc: string): Observable<Application> {
    let application = { Rejestracja: rejestracja, Tresc: tresc, IdRodzajMaszyny: idRodzajMaszyny };

    console.log(application);
    return this.http.put<Application>(this.applicationsUrl, application)
      .pipe(
        tap(() => alert('Wniosek przesłany pomyślnie.')),
        catchError(this.handleError<Application>('addNewAppliaction'))
      );
  }

  editApplication(idWniosek: number, czyPoprawny: boolean): Observable<Application> {
    let update = { idWniosek: idWniosek, czyPoprawny: czyPoprawny };

    return this.http.patch<Application>(this.applicationsUrl, update)
      .pipe(
        catchError(this.handleError<Application>('editApplication'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert('Error: ' + error);
      return of(result as T);
    }
  }
}
