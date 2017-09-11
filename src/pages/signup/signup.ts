import { Component } from '@angular/core';
import { NavController, NavParams,Loading,LoadingController,AlertController} from 'ionic-angular';
import { FormGroup,FormBuilder,Validators} from "@angular/forms";

import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { User } from "../../models/user.model";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService:AuthService,
    public userService:UserService,
    public formBuilder:FormBuilder,
    public loadingCtrl:LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    let emailRegex = /^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9]*[a-z0-9])?)*$/i;
    
    this.signupForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.compose([Validators.required,Validators.pattern(emailRegex)])]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });
  }
  
 
  onSubmit():void{
    
    let loading:Loading = this.showLoading();
    let formUser = this.signupForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authState:FirebaseAuthState)=>{
      delete formUser.password;
      formUser.uid = authState.auth.uid;
      this.userService.create(formUser).
      then(()=>{
        console.log("Usuário Cadastrado!");
        loading.dismiss();
      }).catch((error:Error)=>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error.message);
      });
    }).catch((error:Error)=>{
      console.log(error);
      loading.dismiss();
      this.showAlert(error.message);
    });
  }
  private showLoading():Loading{
    let loading: Loading = this.loadingCtrl.create({
      content:"Please wait..."
    });
    loading.present();
    return loading;
  }
  private showAlert(message:string):void{
    this.alertCtrl.create({
      message:message,
      buttons:['ok']
    }).present();
  }

}
