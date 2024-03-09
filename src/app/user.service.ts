import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly accessTokenKey = '';
  private readonly accessUsername = '';

  constructor() { }

  getUser(): any {
    return this.accessUsername; //localStorage.getItem(this.accessTokenKey);
    // return user ? JSON.parse(user) : null;
  }

  setUser(user: any): void {
    localStorage.setItem(this.accessTokenKey, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  isLoggedIn(): boolean {
    return (!!localStorage.getItem(this.accessTokenKey))&&(!!localStorage.getItem(this.accessUsername));
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
  }


}
