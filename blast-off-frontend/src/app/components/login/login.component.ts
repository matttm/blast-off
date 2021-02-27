import { Component, OnInit } from '@angular/core';

interface LoginForm {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginForm;

  constructor() {
    this.model = {password: '', username: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {}

}
