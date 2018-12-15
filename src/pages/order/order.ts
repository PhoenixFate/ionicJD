import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public list=[];
  public LoginPage=LoginPage;

  public userinfo='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewDidEnter(){
    //获取订单信息
    this.list=this.storageProvider.get('orderData');
    console.log(this.list);
 

}

}
