import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { factory } from 'typescript';
import { FavouriteComponent } from '../components/favourite/favourite.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = env.apiUrl;

  constructor(private http: HttpClient) {}

  signUp(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signUp`, body);
  }
  signIn(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signIn`, body);
  }
  signOut(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signOut`, body);
  }
  isLoggedIn() {
    return !!localStorage.getItem('TOKEN');
  }
}
