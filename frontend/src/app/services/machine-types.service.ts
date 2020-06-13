import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MachineType } from '../models/machine-type';

@Injectable({
  providedIn: 'root'
})
export class MachineTypesService {
  private machineTypesUrl = 'http://localhost:5000/api/rodzajeMaszyn';

  constructor(
    private http: HttpClient
  ) { }

  getMachineTypes(): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.machineTypesUrl)
      .pipe(
        catchError(this.handleError<MachineType[]>('getMachineTypes', []))
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
