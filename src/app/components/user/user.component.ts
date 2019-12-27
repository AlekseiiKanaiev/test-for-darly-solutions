import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any;
  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
    this.authServ.userData.subscribe(
      user => {
        console.log(user);
        if (user) { this.user = user; }
      }
    );
  }
  logOut() {
    this.authServ.logOut();
    this.router.navigate(['login']);
  }
}
