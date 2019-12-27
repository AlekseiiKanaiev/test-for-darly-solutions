import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    userData: Observable<firebase.User>;
    user: any;

    constructor(public afAuth: AngularFireAuth) {
        this.userData = afAuth.authState;
        this.userData.subscribe(
            user => {
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

    doGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth.signInWithPopup(provider)
                .then(res => resolve(res));
        });
    }

    doEmailAndPasswordLogin(value) {
        // return new Promise<any>((resolve, reject) => {
        //     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        //         .then(
        //             res => resolve(res),
        //             err => reject(err)
        //         );
        // });
        return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
            .then(res => {
                console.log('Success');
                console.log(res);
            }
            )
            .catch(err => console.log('Dinied: ' + err.message));
    }

    doRegister(value) {
        // return new Promise<any>((resolve, reject) => {
        //     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        //         .then(
        //             res => resolve(res),
        //             err => reject(err)
        //         );
        // });
        this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then(res => {
                console.log('Success ');
                console.log(res);
            })
            .catch(err => console.log('Something wrong: ' + err.message));
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
        });
    }
}
