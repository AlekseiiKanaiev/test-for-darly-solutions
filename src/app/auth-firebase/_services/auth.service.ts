import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService {
    userData: Observable<firebase.User>;
    user: firebase.User;

    constructor(public afAuth: AngularFireAuth,
                private router: Router,
                private ngZone: NgZone,
                private alertServ: AlertService) {

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

    private navigate(url: string) {
        this.ngZone.run(() => this.router.navigate([url]));
    }

    private socialLogin(provider: firebase.auth.GoogleAuthProvider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }

    doGoogleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.socialLogin(provider)
            .then(res => {
                this.alertServ.alertSuccess('You have been successfully logged in', true);
                this.navigate('user');
            })
            .catch(err => {
                console.log(err.message);
                this.alertServ.alertError(err.message);
            });
    }

    async doEmailAndPasswordLogin(value: { email: string; password: string; }) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
            this.alertServ.alertSuccess('You have been successfully logged in', true);
            this.navigate('user');
        } catch (err) {
            return this.alertServ.alertError(err.message);
        }
    }

    doRegister(value: {name: string, email: string; password: string; }) {
        this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then(
                res => {
                    res.user.updateProfile({displayName: value.name});
                    this.alertServ.alertSuccess('You have been successfully registred', true);
                    this.navigate('user');
                }
            )
            .catch(
                err => {
                    console.log('Something wrong: ' + err.message);
                    this.alertServ.alertError(err.message);
                }
            );
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.navigate('login');
        });
    }
}
