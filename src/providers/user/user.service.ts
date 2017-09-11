import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable} from "angularfire2";
import { User } from "../../models/user.model";
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;

  constructor(
    public http: Http,
    public af:AngularFire
  ) {
    super();
    this.users = this.af.database.list('/users');
  }
  
  create(user:User):firebase.Promise<void>{ 
    return this.af.database.object(`/users/${user.uid}`).set(user)
      .catch(this.handleObservableError);
  }
  userExists(username:string):Observable<boolean>{
    return this.af.database.list(`/users`,{
      query:{
        orderByChild:'username',
        equalTo: username
      }
    }).map((users:User[])=>{
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
