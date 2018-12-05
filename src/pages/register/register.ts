import { StorageProvider } from './../../providers/storage/storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterCodePage } from '../register-code/register-code';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public tel='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider:StorageProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }

  goRegisterCodePage(){
    if(/^\d{11}$/.test(this.tel)){
      this.httpServiceProvider.doPost('api/sendCode',{tel:this.tel},(data)=>{
        console.log(this.tel);
        console.log(data);
        if(data.success || true){
          this.storageProvider.set('tel',this.tel);
          this.navCtrl.push(RegisterCodePage);
        }else {
          //alert("发送验证码失败")
        }
      })
    }else {
      alert('电话号码错误');
    }  
  }
}
