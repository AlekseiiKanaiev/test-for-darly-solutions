import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './alert.service';


@Injectable()
export class HandlerEmailService {

    constructor(public afAuth: AngularFireAuth, private alertServ: AlertService) {}

    verifyEmail(code: string) {
        this.afAuth.auth.applyActionCode(code)
        .then(
            res => {
                this.alertServ.alertSuccess('Your email has been successfully ferified', true);
                // console.log(JSON.parse(localStorage.getItem('user')));
            }
        )
        .catch(err => this.alertServ.alertError(err.message));
    }
}
