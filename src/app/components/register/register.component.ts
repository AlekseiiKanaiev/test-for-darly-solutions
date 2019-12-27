import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private authServ: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.email]],
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
      } else {
        confPass.setErrors(null);
      }
    };
  }

  register(value) {
    console.log(value);
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    } else {
      this.authServ.doRegister(value)
      .then(res => {
        console.log('Success ');
        res.user.updateProfile({
          displayName: this.f.name.value
        });
        console.log(res);
        this.router.navigate(['user']);

    })
    .catch(err => console.log('Something wrong: ' + err.message));
    }
  }
}
