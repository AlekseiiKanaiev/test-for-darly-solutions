import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    userData: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth) {}

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
        this.afAuth.auth.signInWithEmailAndPassword(value.userEmail, value.userPassword)
            .then(res => console.log('Success'))
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
            .then(res => console.log('Success ' + res))
            .catch(err => console.log('Something wrong: ' + err.message));
    }
}
