import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authServ: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  login(value) {
    this.authServ.doEmailAndPasswordLogin(value);
      // .then(
      //   res => console.log(res)
      // )
      // .catch(
      //   err => console.log('Denied: ' + err.message)
      // );
    // console.log(this.loginForm);
    // console.log(value);
    // this.authServ.doEmailAndPasswordLogin(value);
  }
  doGoogleLogin() {
    this.authServ.doGoogleLogin();
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
