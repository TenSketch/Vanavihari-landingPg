import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = '';
  private accessUsername = '';
  private accessUserFullname = '';
  private apiCommonUrl = 'https://www.zohoapis.com/creator/custom/vanavihari';
  
  constructor(private http: HttpClient) { }

  sendDataToServer(apiUri: any, params: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.get<any>(`${this.apiCommonUrl}/${apiUri}`, { params });
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  setAccountUsername(username: string): void {
    localStorage.setItem(this.accessUsername, username);
  }

  setAccountUserFullname(userfullname: string): void {
    localStorage.setItem(this.accessUserFullname, userfullname);
  }

  getAccountUsername(): string | null {
    return localStorage.getItem(this.accessUsername);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getUserFullName(): string | null {
    return localStorage.getItem(this.accessUserFullname);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }
}
