import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages();
  }

}
