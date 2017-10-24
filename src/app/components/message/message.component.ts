import { Component, Input, OnInit } from '@angular/core';

import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;

  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.username;
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
  }

}
