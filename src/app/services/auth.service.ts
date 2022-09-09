import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserForLogin } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

authUser(user: UserForLogin) {
  return this.http.post(this.baseUrl + '/account/login', user);

  }
}
