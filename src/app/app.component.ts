import { FirebaseAuthState } from 'angularfire2';
import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { User } from '../models/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;
  currentUser:User;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    authService:AuthService,
    userService:UserService,
  ){
      authService.auth.subscribe((authState:FirebaseAuthState)=>{
        if(authState){
          userService.currentUser.subscribe((user:User)=>{
            this.currentUser = user;
          });
        }
      });
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

