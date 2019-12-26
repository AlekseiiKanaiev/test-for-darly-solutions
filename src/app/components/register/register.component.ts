import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;


  constructor(private authServ: AuthService) {
    this.registerForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm);
    // this.authServ.doRegister(this.myForm);
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
