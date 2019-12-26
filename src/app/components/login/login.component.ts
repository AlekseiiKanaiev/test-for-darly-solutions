import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authServ: AuthService) {
      this.loginForm = new FormGroup({
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  login(value) {
    console.log(this.loginForm);
    console.log(value);
    this.authServ.doEmailAndPasswordLogin(value);
  }
  doGoogleLogin() {
    this.authServ.doGoogleLogin();
  }
}
