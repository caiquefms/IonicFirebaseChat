import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { AngularFireAuth, FirebaseAuthState} from 'angularfire2';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService extends BaseService{
    
  constructor(
    public http: Http,
    public auth:AngularFireAuth,    
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }
  createAuthUser(user:{email:string,password:string}
  ):firebase.Promise<FirebaseAuthState>
  {
    return this.auth.createUser(user)
      .catch(this.handlePromisseError);
  }
  signinWithEmail(user:{email:string,password:string}
  ):firebase.Promise<boolean>
  {
    return this.auth.login(user)
      .then((authState:FirebaseAuthState)=>{
        return authState != null;
      }).catch(this.handlePromisseError);
  }
  logout():Promise<void>{
    return this.auth.logout();
  }

  get authenticated():Promise<boolean>{
    return new Promise((resolve,reject)=>{
      this.auth
      .first()
      .subscribe((authState:FirebaseAuthState)=>{
        (authState) ? resolve(true) : reject(false); 
      });
    });
  }

}
