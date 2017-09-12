import { CapitalizePipe } from './../pipes/capitalize/capitalize.pipes';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AngularFireModule, FirebaseAppConfig ,AuthProviders,AuthMethods} from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { UserService } from '../providers/user/user.service';
import { AuthService } from './../providers/auth/auth.service';
import { SigninPage } from '../pages/signin/signin';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBByQRIHpemsj-DzYmvK_fXgGRXKFT2kK4",
  authDomain: "ionic2-firebase-chat-45064.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-45064.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-45064.appspot.com",
  messagingSenderId: "547681878412"
}

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}


@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
  ]
})
export class AppModule {}
