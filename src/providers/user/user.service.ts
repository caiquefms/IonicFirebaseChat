import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from "angularfire2";
import { User } from "../../models/user.model";


@Injectable()
export class UserService {

  constructor(
    public http: Http,
    public af:AngularFire
  ) {}
  
  create(user:User):firebase.Promise<void>{ 
    return this.af.database.list(`/users`).push(user);
  }

}
