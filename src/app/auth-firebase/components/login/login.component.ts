import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  // user: string;

  constructor(private authServ: AuthService, private fb: FormBuilder, private alertServ: AlertService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/[\w.+-]+@[\w.-]+\.[\D]{2,4}/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(value: {email: string, password: string}) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    } else {
      this.authServ.doEmailAndPasswordLogin(value);
    }
  }

  googleLogin() {
    this.authServ.doGoogleLogin();
  }
}
