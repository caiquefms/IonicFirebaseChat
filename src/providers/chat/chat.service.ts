import { FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { AngularFire } from 'angularfire2';
import { Chat } from './../../models/chat.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from '../base.service';

@Injectable()
export class ChatService extends BaseService{
  chats: FirebaseListObservable<Chat[]>
  constructor(
    public af:AngularFire,
    public http: Http) {
    super();
    this.setChats();
  }
  private setChats():void{
    this.af.auth.subscribe((authState:FirebaseAuthState)=>{
      if(authState){
        this.chats = <FirebaseListObservable<Chat[]>> this.af.database.list(`/chats/${authState.auth.uid}`,{
          query: {
            orderByChild:'timestamp'
          }
        }).map((chats:Chat[])=>{
          return chats.reverse();
        }).catch(this.handleObservableError);
      }
    })
  }

  create(chat:Chat,userId1:string,userId2:string):firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch(this.handlePromisseError);
  }
  getDeepChat(userId1:string,userId2:string):FirebaseObjectObservable<Chat>{
    return <FirebaseObjectObservable<Chat>>
    this.af.database.object(`/chats/${userId1}/${userId2}`)
    .catch(this.handleObservableError);
  }
  
  updatePhoto(chat:FirebaseObjectObservable<Chat>,chatPhoto:string,recipientPhoto:string):firebase.Promise<boolean>{
    if(chatPhoto != recipientPhoto){
      return chat.update({
        photo:recipientPhoto
      }).then(()=>{
        return true;
      }).catch(this.handlePromisseError);
    }
    return Promise.resolve(false);
  }

}
