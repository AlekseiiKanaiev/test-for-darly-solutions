import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth-firebase/_services/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  changePassForm: FormGroup;
  submitted = false;
  curUser: firebase.User;

  constructor(private fb: FormBuilder, private authServ: AuthService) {
  }

  ngOnInit() {
    this.changePassForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.userPasswordConfirmValidator('password', 'confirmPassword')
    }
    );

  }

  // convenience getter for easy access to form fields
  get f() { return this.changePassForm.controls; }

  userPasswordConfirmValidator(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confPass = formGroup.controls[passwordConfirm];

      if (pass.value !== confPass.value) {
        confPass.setErrors({mustMatch: true});
      }
    };
  }

  changePass(value: {old_password: string, password: string }) {
    this.authServ.changePassword(value);
  }

}
