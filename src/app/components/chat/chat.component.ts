import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() loggedStatus = new EventEmitter<any>();

  user: User;

  loggedOut = false;

  chatMessage:string

  constructor(private authService:AuthService) { }

  ngAfterViewChecked(): void {
    let d = document.querySelector('chat-area');
    if(d)
    {
      d.scrollTop = d.scrollHeight;
    }
  }

  ngOnInit(): void {
    // let d = document.querySelector("main");
    // if(d)
    // {
    //   d.scrollTop = d.scrollHeight;
    // }
  }

  onSubmit() {
    console.log(this.chatMessage)
  }

  // submit(){
  //   console.log(this.chatMessage);
  // }

  logout(){
    this.loggedOut = !this.loggedOut;
    this.loggedStatus.emit(this.loggedOut);
  }
}
