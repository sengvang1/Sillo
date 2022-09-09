import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl = environment.baseUrl;
constructor(private http: HttpClient) { }

addUser(user: User){

  return this.http.post(this.baseUrl + '/account/register', user);
  // let users = [];
  // if (localStorage.getItem('Users')) {
  //   users = JSON.parse(localStorage.getItem('Users'));
  //   users = [user, ...users];
  // } else {
  //   users = [user];
  // }
  // localStorage.setItem('Users', JSON.stringify(users));
}

}


