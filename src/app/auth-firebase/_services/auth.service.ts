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
                console.log(user);
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
        console.log(JSON.parse(localStorage.getItem('user')));
        return JSON.parse(localStorage.getItem('user')) !== null;
    }

    isVerified(): boolean {
        // console.log(JSON.parse(localStorage.getItem('user')).emailVerified);
        // return true;
        return this.isLoggedIn() ? JSON.parse(localStorage.getItem('user')).emailVerified === true : false;
    }

    verifyEmail(code: string) {
        this.afAuth.auth.applyActionCode(code)
        .then(
            res => {
                this.alertServ.alertSuccess('Your email has been successfully ferified', true);
                console.log(JSON.parse(localStorage.getItem('user')));
                this.navigate('user');
            }
        )
        .catch(err => this.alertServ.alertError(err.message));
    }

    private navigate(url: string) {
        this.ngZone.run(() => this.router.navigate([url]));
    }

    private socialLogin(provider: firebase.auth.GoogleAuthProvider) {
        return this.afAuth.auth.signInWithPopup(provider).then(res => {
            this.alertServ.alertSuccess('You have been successfully logged in', true);
            this.navigate('user');
        })
        .catch(err => {
            this.alertServ.alertError(err.message);
        });
    }

    doGoogleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.socialLogin(provider);
    }

    async doEmailAndPasswordLogin(value: { email: string; password: string; }) {
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
            this.alertServ.alertSuccess('You have been successfully logged in', true);
            // this.navigate('user');
        } catch (err) {
            return this.alertServ.alertError(err.message);
        }
    }

    doRegister(value: {name: string, email: string; password: string; }) {
        this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then(
                res => {
                    res.user.updateProfile({displayName: value.name});
                    res.user.sendEmailVerification()
                        .then(
                            result => {
                                this.alertServ.alertSuccess('You have been successfully registred', true);
                                this.navigate('/register/email-verification');
                            }
                        )
                        .catch(err => this.alertServ.alertError(err.messsage));
                    // this.alertServ.alertSuccess('You have been successfully registred', true);
                    // this.navigate('/register/email-verification');
                }
            )
            .catch(err => this.alertServ.alertError(err.message));
    }

    changePassword(value: {old_password: string, password: string }) {
        if (this.user) {
            const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, value.old_password);
            this.user.reauthenticateWithCredential(credentials)
                .then(
                    res => {
                        this.user.updatePassword(value.password);
                        this.alertServ.alertSuccess('Password has been changed successfully', true);
                        this.navigate('user');
                    }
                )
                .catch(err => this.alertServ.alertError(err.message));
        }
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.navigate('login');
        });
    }
}
