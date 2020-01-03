import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HandlerEmailService } from '../_services/handler-email.service';
import { AlertService } from '../_services/alert.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authServ: AuthService,
                private router: Router,
                public afAuth: AngularFireAuth) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // console.log(route.queryParams);
        // console.log(state);
        // if (route.queryParams.mode === 'verifyEmail' && route.queryParams.apiKey === environment.firebase.apiKey) {
        //         this.hadlerServ.verifyEmail(route.queryParams.oobCode);
        // }
        console.log(this.authServ.isVerified());
        if (this.authServ.isVerified()) {
            if (state.url === '/login' || state.url === '/register') {
                this.router.navigate(['user']);
            }
            return true;
        } else {
            if (state.url === '/login' || state.url === '/register' || state.url.startsWith('/register/email-verification')) {
                return true;
            }
            this.router.navigate(['login']);
        }
    }

}
