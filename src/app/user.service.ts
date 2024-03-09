import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly accessTokenKey = '';
  private readonly accessUsername = '';
  private readonly accessUserFullname = '';

  constructor() { }

  getUser(): any {
    return localStorage.getItem(this.accessUserFullname); //localStorage.getItem(this.accessTokenKey);
    // return user ? JSON.parse(user) : null;
  }

  setUser(user: any): void {
    localStorage.setItem(this.accessTokenKey, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  isLoggedIn(): boolean {
    return (!!localStorage.getItem(this.accessTokenKey))&&(!!localStorage.getItem(this.accessUsername))&&(!!localStorage.getItem(this.accessUserFullname));
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.accessUsername);
    localStorage.removeItem(this.accessUserFullname);
  }


}
