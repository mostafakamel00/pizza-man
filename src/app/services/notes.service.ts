import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  apiForkify = environment.apiForkify;
  constructor(private http: HttpClient) {}
  // getNotes(body: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}getUserNotes`, body);
  // }
  getPizza(): Observable<any> {
    return this.http.get(`${this.apiForkify}pizza`);
  }
}
