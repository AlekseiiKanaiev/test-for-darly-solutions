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
                // console.log(user);
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
        // console.log(JSON.parse(localStorage.getItem('user')));
        return JSON.parse(localStorage.getItem('user')) !== null;
    }

    isVerified(): boolean {
        if (this.isLoggedIn()) {
            if (JSON.parse(localStorage.getItem('user')).emailVerified) {
                return true;
            } else {
                this.alertServ.alertError('You must verify your email');
                return false;
            }
        }
        return false;
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
            // console.log(res.user.emailVerified);
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
                    const actionSetting = {url: 'http://localhost:4200/register/email-verification'};
                    res.user.sendEmailVerification(actionSetting)
                        .then(
                            result => {
                                this.alertServ.alertSuccess('You have been successfully registred', true);
                                this.navigate('/register/email-verification');
                            }
                        )
                        .catch(err => this.alertServ.alertError(err.messsage));
                }
            )
            .catch(err => this.alertServ.alertError(err.message));
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.navigate('login');
        });
    }

    forgotPassword(email: string) {
        const actionSetting = {url: 'http://localhost:4200/login'};
        return this.afAuth.auth.sendPasswordResetEmail(email, actionSetting)
            .then(
                res => this.alertServ.alertSuccess('New password sent. Check your email box.')
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
}
