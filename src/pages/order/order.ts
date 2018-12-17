import { PaymentPage } from './../payment/payment';
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
  public AddressPage = AddressPage;
  public userinfo = '';
  public address = '';
  public allPrice = 0;
  public leaveMessage = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider: StorageProvider,
    public toolsProvider: ToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewWillEnter() {
    //获取订单信息
    this.list = this.storageProvider.get('orderData');
    this.sumPrice();
    this.userinfo = this.toolsProvider.getUserInfo();
    this.getDefaultAddress();
  }

  //获取默认收获地址
  getDefaultAddress() {
    let userInfo = this.toolsProvider.getUserInfo();
    let json = {
      uid: userInfo['_id'],
      salt: userInfo.salt
    }
    let sign = this.toolsProvider.sign(json);
    console.log(sign);
    let url = 'api/oneAddressList?uid=' + userInfo['_id'] + '&&sign=' + sign;
    this.httpServiceProvider.requestDataJsonp(url, (data) => {
      if (data.success) {
        this.address = data.result[0];
        console.log(this.address);
      } else {
      }
    })
  }

  sumPrice() {
    let tempPrice = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked) {
        tempPrice += this.list[i].productPrice * this.list[i].productCount;
      }
    }
    this.allPrice = tempPrice;
  }

  //提交订单
  goPayment() {
    if (!this.userinfo) {
      this.navCtrl.push('LoginPage', {
        history: 'order'
      })
    } else if (!this.address) {
      alert('您还没有选择收货地址');
    } else {
      //提交订单
      let userinfo: any = this.userinfo;
      var uid: any = userinfo['_id'];
      var address: any = this.address['address'];
      var phone: any = this.address['phone'];
      var name: any = this.address['name'];
      var all_price = this.allPrice;
      var products: any = JSON.stringify(this.list);
      //签名的字段
      let json = {
        uid: uid,
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: all_price
      }
      let sign = this.toolsProvider.sign(json);
      //请求数据
      let api = 'api/doOrder';
      this.httpServiceProvider.doPost(api, {
        uid: userinfo._id,
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: all_price,
        sign: sign,
        products: products
      }, (data) => {
        if (data.success) {
          this.navCtrl.push(PaymentPage);
        } else {
          alert(data.message);
        }
      })
    }
  }


}
