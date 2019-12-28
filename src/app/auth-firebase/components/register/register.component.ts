import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private authServ: AuthService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.pattern(/[\w.+-]+@[\w.-]+\.[\D]{2,4}/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.userPasswordConfirmValidator('password', 'confirmPassword')
    }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  userPasswordConfirmValidator(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confPass = formGroup.controls[passwordConfirm];

      if (pass.value !== confPass.value) {
        confPass.setErrors({mustMatch: true});
      }
    };
  }

  register(value: {name: string, email: string, password: string }) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    } else {
      this.authServ.doRegister(value);
    }
  }
}
