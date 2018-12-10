import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the RegisterPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-password',
  templateUrl: 'register-password.html',
})
export class RegisterPasswordPage {
  public tel='';
  public code='';
  public password='';
  public repassword='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storageProvider:StorageProvider,
    public httpServiceProvider: HttpServiceProvider,) {
      this.tel=storageProvider.get('tel');
      this.code=this.storageProvider.get('code');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPasswordPage');
  }

  doRegister(){
    if(this.password!=this.repassword && this.password!=''){
      alert("密码不一致")
    }else {
      //提交数据
      this.httpServiceProvider.doPost('api/register',{'tel':this.tel,'code':this.code,'password':this.password},(data)=>{
        console.log(data);
        if(data.success){
          this.storageProvider.set('userinfo',data.userinfo[0]);
          //注册成功，返回到用户中心
          this.navCtrl.popToRoot();
        }else {
          alert('注册失败');
        }
      })
    }
  }

}
