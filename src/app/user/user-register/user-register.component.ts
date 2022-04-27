import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userName: new FormControl('Mark', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
  }

}
