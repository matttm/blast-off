import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';

interface LoginForm {
  username: string;
  password: string;
}

/**
 * A straight forward login component
 *
 * This uses a template driven form because this is a simple
 * login that does not require much validation
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginForm;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.model = {password: '', username: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginService.login(
      this.model.username,
      this.model.password
    ).subscribe(() => console.log('Logging in...'));
  }

  onNavigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
