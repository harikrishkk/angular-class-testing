import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ld-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  handleLogin() {
    const credentials = this.loginForm.value;
    this.loginService.login(credentials);
  }
}
