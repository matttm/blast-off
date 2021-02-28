import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login/login.service';

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

  constructor(private loginService: LoginService) {
    this.model = {password: '', username: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {}

}
