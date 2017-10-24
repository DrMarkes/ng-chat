import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {
  private user: any;
  private chatMessagesRef: AngularFireList<ChatMessage>;
  private chatMessages: Observable<ChatMessage[]>;
  private username: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });

    this.chatMessagesRef = this.db.list<ChatMessage>(
      'messages',
        ref => ref.limitToLast(25).orderByKey()
    );

    this.chatMessages = this.chatMessagesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  sendMessage(msg: string) {
    const timestamp = ChatService.getTimeStamp();
    const email = 'this.user.email';
    const username = 'this.user.username';

    this.chatMessagesRef.push({
      message: msg,
      timeSent: timestamp,
      email: email,
      username: username
    });
  }

  private static getTimeStamp(): Date {
    const now = new Date();
    // const date = now.getUTCFullYear() + '/' +
    //   (now.getUTCMonth() + 1) + '/' +
    //   now.getUTCDate();
    // const time = now.getUTCHours() + ':' +
    //   now.getUTCMinutes() + ':' +
    //   now.getUTCSeconds();
    //
    // return (date + ' ' + time);

    return now;
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.chatMessages;
  }
}
