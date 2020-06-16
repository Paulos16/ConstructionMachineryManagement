import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  private machinesUrl = 'http://localhost:5000/api/maszyny';

  constructor(
    private http: HttpClient
  ) { }

  getMachines(dueDate: string): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.machinesUrl, { params: { dueDate: dueDate } })
      .pipe(
        catchError(this.handleError<Machine[]>('getMachines', []))
      );
  }

  addNewMachine(idRodzajMaszyny: number, rejestracja: string, terminWaznosciPrzegladu: string, idWniosek: number): Observable<Machine> {
    let body = { Rejestracja: rejestracja, TerminWaznosciPrzegladu: terminWaznosciPrzegladu, IdRodzajMaszyny: idRodzajMaszyny, IdWniosek: idWniosek };

    return this.http.put<Machine>(this.machinesUrl, body)
      .pipe(
        tap(() => alert('Nowa maszyna została zapisana pomyślnie.')),
        catchError(this.handleError<Machine>('addNewMachine'))
      );
  }

  editMachineOperability(idMaszyna: number, czyZdatna: boolean): Observable<Machine> {
    let body = { IdMaszyna: idMaszyna, CzyZdatna: czyZdatna };

    return this.http.patch<Machine>(this.machinesUrl, body)
      .pipe(
        tap(() => alert('Zdatność maszyny do eksploatacji ustalona pomyślnie.')),
        catchError(this.handleError<Machine>('editMachineOperability'))
      );
  }

  editMachineNextInspection(idMaszyna: number, terminNastepnegoPrzegladu: string): Observable<Machine> {
    let body = { IdMaszyna: idMaszyna, TerminNastepnegoPrzegladu: terminNastepnegoPrzegladu };

    return this.http.post<Machine>(this.machinesUrl, body)
      .pipe(
        tap(() => alert('Termin następnego przeglądu maszyny zaplanowany pomyślnie.')),
        catchError(this.handleError<Machine>('editMachineNextInspection'))
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
