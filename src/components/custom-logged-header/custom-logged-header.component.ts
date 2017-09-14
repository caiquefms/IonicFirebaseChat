import { User } from './../../models/user.model';
import { AlertController, App, MenuController } from 'ionic-angular';
import { Component,Input} from '@angular/core';
import { BaseComponent } from '../base.component';
import { AuthService } from "../../providers/auth/auth.service";


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title: string;
  @Input() user:User;
  

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app:App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl,authService,app,menuCtrl);
  }

}
