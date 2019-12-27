import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-firebase/_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: firebase.User;
  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
    this.authServ.userData.subscribe(
      (user: firebase.User) => {
        console.log(user);
        if (user) {
          this.user = user;
          // location.reload();
        }
      }
    );
  }
  // ngAfterViewInit() {
  //   location.reload();
  // }

  logOut() {
    this.authServ.logOut();
  }
}
