import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authServ: AuthService, private router: Router, public afAuth: AngularFireAuth) {
        // this.authServ.userData.subscribe(
        //     data => {
        //         console.log('get data in guard');
        //         console.log(data);
        //         this.isUser = (data) ? true : false;
        //     }
        // );
        // console.log(afAuth.authState);
        // this.isUser = (afAuth.authState === null) ? false : true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(this.authServ.isLoggedIn());
        if (this.authServ.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['login']);
        }
    }

}
