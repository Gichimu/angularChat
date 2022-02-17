  
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, BehaviorSubject, observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject(null);
  public user$: Observable<firebase.User> = this.user.asObservable().pipe(
    switchMap((authenticatedUser: Observable<firebase.User>) => authenticatedUser)
  );
  constructor(private readonly afAuth: AngularFireAuth) { 
    this.user.next(this.afAuth.authState);
  }
  
  login(): Observable<auth.UserCredential>{
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<any>{
    return from(this.afAuth.auth.signOut());
  }
}