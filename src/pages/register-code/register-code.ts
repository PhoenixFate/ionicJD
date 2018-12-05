import { RegisterPasswordPage } from './../register-password/register-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from './../../providers/storage/storage';

/**
 * Generated class for the RegisterCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-code',
  templateUrl: 'register-code.html',
})
export class RegisterCodePage {
  public code='';
  public isShow=true;
  public num=10;
  public tel='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider:StorageProvider) {
      this.tel=this.storageProvider.get('tel');
  }

  ionViewDidLoad() {
    this.doTimer();
    //console.log('ionViewDidLoad RegisterCodePage');
  }

  goRegisterPasswordPage(){
    //验证验证码是否成功
    this.httpServiceProvider.doPost('api/validateCode',{'tel':this.tel},(data)=>{
      console.log(data);
      if(data.success || true){
        this.storageProvider.set('code',this.code);
        this.navCtrl.push(RegisterPasswordPage);
      }else {
        //alert("验证错误");
      }
    });
  }

  sendCode(){
    this.httpServiceProvider.doPost('api/sendCode',{"tel":this.tel},(data)=>{
      console.log(data);
      if(data.success){
        this.doTimer();
        this.num=10;
        this.isShow=true;
      }else {
        alert("发送验证码失败")
      }
    })
  }

  //倒计时
  doTimer(){
    var timer=setInterval(()=>{
      this.num--;
      if(this.num==0){
        clearInterval(timer);
        this.isShow=false;
      }
    },1000)
  }
}
