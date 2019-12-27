import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

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

    // console.log(this.registerForm.get('userPassword').value);
    // if (password.value !== passwordConfirm.value) {
    //   return {userPasswordRepeat: true};
    // }
    // return null;
  }

  register(value) {
    console.log(value);
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    } else {
      this.authServ.doRegister(value);
        // .then(
        //   res => {
        //     console.log(res);
        //     this.errorMessage = '';
        //     this.successMessage = 'You have been registred';
        //   },
        //   err => {
        //     console.log(err);
        //     this.errorMessage = err.message;
        //     this.successMessage = '';
        //   }
        // );
    }
  }
}
