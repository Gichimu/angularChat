import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { User } from 'src/app/user';

// const socket = io();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  destroyed$: Subject<null> = new Subject();

  newUser: User

  constructor(
    private readonly authService: AuthService,
    private readonly socketService: SocketService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.authService
      .login()
      .pipe(
        catchError((error) => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState) => {
        this.newUser = new User(authState.user.displayName, authState.user.email, authState.user.photoURL)
        this.socketService.emit('user', this.newUser)
        this.router.navigate(['chat']);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  logout(){
    this.ngOnDestroy();
    this.router.navigate(['login']);
  }
}
