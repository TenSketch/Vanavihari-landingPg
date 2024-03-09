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
    return localStorage.getItem(this.accessUserFullname);
    
    // const user = localStorage.getItem(this.accessTokenKey);
    // return user ? JSON.parse(user) : null;
  }

  setUser(user: any): void {
    // const expiration = new Date();
    // expiration.setTime(expiration.getTime() + (expirationMinutes * 60 * 1000));
    localStorage.setItem(this.accessTokenKey, user); //JSON.stringify({user, expiration: expiration.getTime()})
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
