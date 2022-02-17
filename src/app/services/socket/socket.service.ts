import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  readonly uri: string = 'http://localhost:3000/chat';
  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<void> {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  disconnect(eventName = 'disconnect'): void {
    this.socket.emit(eventName);
  }
}
