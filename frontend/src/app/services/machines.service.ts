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

  getMachines(dueDate: string) : Observable<Machine[]> {
    return this.http.get<Machine[]>(this.machinesUrl + '/?dueDate=' + dueDate)
      .pipe(
        catchError(this.handleError<Machine[]>('getMachines', []))
      );
  }

  addNewMachine(idRodzajMaszyny: number, rejestracja: string, terminWaznosciPrzegladu: string): Observable<Machine> {
    let machine = { rejestracja: rejestracja, terminWaznosciPrzegladu: terminWaznosciPrzegladu, idRodzajMaszyny: idRodzajMaszyny };

    return this.http.put<Machine>(this.machinesUrl, machine)
      .pipe(
        catchError(this.handleError<Machine>('addNewMachine'))
      );
  }

  editMachine(idMaszyna: number, terminNastepnegoPrzegladu: string): Observable<Machine> {
    let update = { idMaszyna: idMaszyna, terminNastepnegoPrzegladu: terminNastepnegoPrzegladu };

    return this.http.post<Machine>(this.machinesUrl, update)
      .pipe(
        catchError(this.handleError<Machine>('editMachine'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
