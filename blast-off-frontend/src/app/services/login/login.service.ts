import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly sessionUrl: string;

  constructor(private http: HttpClient) {
    this.sessionUrl = '/api/session';
  }

  /**
   * Determines whether user is logged in
   */
  get isLoggedIn(): boolean {
    // TODO: how to store whether logged in?
    return false;
  }

  /**
   * This try to authenticate the provided username
   * and password with the backend and establish a session
   * which should add a JWT in form of a cookie
   *
   * @param username a string representing a username
   * @param password a string representing a password
   */
  login(username: string, password: string): Observable<any> {
    if (!username || !password) {
      return null;
    }
    return this.http.post(this.sessionUrl, {username, password});
  }

  /***
   * This will delete the session on the backend
   */
  logout(): Observable<any> {
    return this.http.delete(this.sessionUrl);
  }
}
