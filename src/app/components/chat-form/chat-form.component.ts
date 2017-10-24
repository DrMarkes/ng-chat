import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
  }

  send() {
    if (this.message === undefined) {
      return;
    }
    this.message = this.message.trim();
    if (this.message === '') {
      return;
    }
    this.chat.sendMessage(this.message);
  }
}
