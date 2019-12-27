import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authServ: AuthService, private router: Router, public afAuth: AngularFireAuth) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(this.authServ.isLoggedIn());
        if (this.authServ.isLoggedIn()) {
            console.log(route);
            console.log(state);
            if (state.url === '/login' || state.url === '/register') {
                this.router.navigate(['user']);
            }
            return true;
        } else {
            if (state.url === '/login') {
                return true;
            }
            this.router.navigate(['login']);
        }
    }

}
