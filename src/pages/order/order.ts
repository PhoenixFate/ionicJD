import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToolsProvider } from '../../providers/tools/tools';
import { AddressPage } from '../address/address';

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
  public list = [];
  public LoginPage = LoginPage;
  public AddressPage=AddressPage;
  public userinfo = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider: StorageProvider,
    public toolsProvider:ToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewDidEnter() {
    //获取订单信息
    this.list = this.storageProvider.get('orderData');
    this.userinfo=this.toolsProvider.getUserInfo();
  }

}
