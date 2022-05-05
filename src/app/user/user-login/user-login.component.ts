import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token', token.UserName);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('Username or password is incorrect')
    }
  }
}
