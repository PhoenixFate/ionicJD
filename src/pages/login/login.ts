import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from './../../providers/storage/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public userinfo={
    "username":"",
    "password":""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storageProvider:StorageProvider,
    public httpServiceProvider: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    if(this.userinfo.username && this.userinfo.password){
      this.httpServiceProvider.doPost('api/doLogin',this.userinfo,(data)=>{
        console.log(data);
        if(data.success){
          //登录成功
          //保存用户信息
          this.storageProvider.set('userinfo',data.userinfo[0]);
          this.navCtrl.popToRoot();
        }else {
          alert(data.message+"");
        }
      })
    }
  }

}
