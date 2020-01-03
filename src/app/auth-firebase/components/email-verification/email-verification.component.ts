import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  user: firebase.User;
  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
    this.authServ.userData.subscribe(
      (user: firebase.User) => {
        if (user) {
          this.user = user;
        }
      }
    );
  }

}
