import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  user: firebase.User;
  constructor(private authServ: AuthService,  private alertServ: AlertService) { }

  ngOnInit() {
    this.authServ.userData.subscribe(
      (user: firebase.User) => {
        if (user) {
          this.user = user;
          if (this.user.emailVerified) {
            this.alertServ.alertSuccess('Your email has been successfully ferified');
          }
        }
      }
    );
  }

}
