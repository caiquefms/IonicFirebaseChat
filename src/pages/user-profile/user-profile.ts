import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser:User;
  canEdit:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthService,
    public userService:UserService
  ) {}
  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
    .subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

}
