import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  // user: string;

  constructor(private authServ: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // this.authServ.userData.subscribe(
    //   data => {
    //     console.log(data);
    //     if (data) { this.user = data.email; }
    //   }
    // );
  }

   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(value: {email: string, password: string}) {
    console.log(value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    } else {
      console.log(1);
      this.authServ.doEmailAndPasswordLogin(value);
    }
  }

  googleLogin() {
    this.authServ.doGoogleLogin();
      // .then(
      //   user => {
      //     this.router.navigate(['user']);
      //   }
      // );
  }

  toRegister() {
    this.router.navigate(['register']);
  }

}
