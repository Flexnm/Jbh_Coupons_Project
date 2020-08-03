import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientType } from './ClientType.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn:boolean = sessionStorage.token != null;
  constructor(private client: HttpClient) {
  }

  public login(email: string, password: string, type: ClientType) {
    return this.client.post(`http://localhost:8080/login/${email}/${password}/${type}`, null, { responseType: 'text' });
  }

  public logout() {
    return this.client.post(`http://localhost:8080/logout/${sessionStorage.token}`, null, { responseType: 'text' });
  }
}
