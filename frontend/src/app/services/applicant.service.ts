import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MachineType } from '../models/machine-type';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private rodzajeMaszynUrl = 'http://localhost:5000/api/rodzajeMaszyn';

  private machineTypesSubject: BehaviorSubject<MachineType[]>;
  machineTypes: Observable<MachineType[]>;

  constructor(
    private http: HttpClient
  ) { }

  getMachineTypes() : Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.rodzajeMaszynUrl)
      .pipe(
        catchError(this.handleError<MachineType[]>('getMachineTypes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
