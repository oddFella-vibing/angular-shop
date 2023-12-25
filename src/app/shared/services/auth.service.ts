import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  currentUser = new Subject<any>();
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.afauth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
        this.userData = JSON.parse(localStorage.getItem('user')!);
        this.currentUser.next(this.userData)
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signUp(displayname: any, email: any, password: any) {
    return this.afauth
      .createUserWithEmailAndPassword(email, password)
      .then((userref: any) => {
        userref.user.updateProfile({
          displayName: displayname,
        });
        this.setUserData(userref.user);

        this.router.navigate(['log-in']);
      })
      .catch((error) => {
        alert(error);
      });
  }
  logIn(email: any, password: any) {
    return this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((userref) => {
        if (userref) {
          this.setUserData(userref.user);
          this.afauth.authState.subscribe((user) => {
            this.router.navigate(['profile']);
          });
        } else {
          this.router.navigate(['log-in']);
        }
      })
      .catch((err) => alert(err));
  }

  setUserData(userdata: any) {
    const user: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userdata.uid}`
    );
    const userDatatemp = {
      uid: userdata.uid,
      email: userdata.email,
      displayName: userdata.displayName,
      photoURL: userdata.photoURL,
      emailVerified: userdata.emailVerified,
    };
    user.set(userDatatemp, { merge: true });
  }
  get isLoggedin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  logOut() {
    this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}
