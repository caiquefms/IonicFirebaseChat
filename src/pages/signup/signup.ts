import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams,Loading,LoadingController,AlertController} from 'ionic-angular';
import { FormGroup,FormBuilder,Validators} from "@angular/forms";

import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';

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
    let username:string = formUser.username;
    
    this.userService.userExists(username)
      .first()
      .subscribe((user_Exists:boolean)=>{
        if(!user_Exists){
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState:FirebaseAuthState)=>{
            delete formUser.password;
            let uui:string = authState.auth.uid;
            this.userService.create(formUser,uui).
            then(()=>{
              console.log("Usuário Cadastrado!");
              this.navCtrl.setRoot(HomePage);
              loading.dismiss();
            }).catch((error:any)=>{
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });
          }).catch((error:any)=>{
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });
        }else{
          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();
        }
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
