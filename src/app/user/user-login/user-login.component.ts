import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/model/User';
import { PropertyListComponent } from 'src/app/property/property-list/property-list.component';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm);
    this.authService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
        console.log(response);
        const user = response;
        localStorage.setItem('token', user.token);
        localStorage.setItem('userName', user.userName);
        this.alertify.success('Login Successful');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.alertify.error(error.error)
      }
    );
    // if (token) {
    //   localStorage.setItem('token', token.UserName);
    //   this.alertify.success('Login Successful');
    //   this.router.navigate(['/']);
    // } else {
    //   this.alertify.error('Username or password is incorrect')
    // }
  }
}
