import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from './../../providers/storage/storage';
import { PersonalPage } from '../personal/personal';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage=LoginPage;
  public RegisterPage=RegisterPage;
  public PersonalPage=PersonalPage;
  public isLogin=true;
  public userinfo={'username':''};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewWillEnter(){
    //判断是否登入
    var userinfo=this.storageProvider.get('userinfo');
    console.log(userinfo);
    if(userinfo&&userinfo.username){
      this.isLogin=true;
      this.userinfo=userinfo;
    }else {
      this.isLogin=false;
      this.userinfo={'username':''};
    }
  }
 
}
