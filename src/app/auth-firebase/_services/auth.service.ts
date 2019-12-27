import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    userData: Observable<firebase.User>;
    user: firebase.User;

    constructor(public afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
        this.userData = afAuth.authState;
        this.userData.subscribe(
            (user: firebase.User) => {
                if (user) {
                    this.user = user;
                    localStorage.setItem('user', JSON.stringify(this.user));
                } else {
                    localStorage.setItem('user', 'null');
                }
            }
        );
    }

    isLoggedIn(): boolean {
        return JSON.parse(localStorage.getItem('user')) !== null;
    }

    socialLogin(provider: firebase.auth.GoogleAuthProvider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }

    doGoogleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.socialLogin(provider)
            .then(res => this.ngZone.run(() => this.router.navigate(['user'])))
            .catch(err => console.log(err.message));
    }

    async doEmailAndPasswordLogin(value: { email: string; password: string; }) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
            console.log('Success');
            console.log(res);
            this.ngZone.run(() => this.router.navigate(['user']));
        } catch (err) {
            return console.log('Dinied: ' + err.message);
        }
    }

    doRegister(value: { email: string; password: string; }) {
        return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.ngZone.run(() => this.router.navigate(['login']));
        });
    }
}
