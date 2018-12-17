import { ToolsProvider } from './../../providers/tools/tools';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//增加收货地址
import { AddAddressPage } from '../add-address/add-address';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { EditAddressPage } from '../edit-address/edit-address';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public list = [];
  public AddAddressPage = AddAddressPage;
  public EditAddressPage = EditAddressPage;
  public userInfo = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public httpServiceProvider: HttpServiceProvider,
    public toolsProvider: ToolsProvider,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  ionViewWillEnter() {
    this.getAddressList();
  }

  getAddressList() {
    let userInfo = this.toolsProvider.getUserInfo();
    let json = {
      uid: userInfo['_id'],
      salt: userInfo.salt
    }
    let sign = this.toolsProvider.sign(json);
    console.log(sign);
    let url = 'api/addressList?uid=' + userInfo['_id'] + '&&sign=' + sign;
    this.httpServiceProvider.requestDataJsonp(url, (data) => {
      console.log(data);
      if (data.success) {
        this.list = data.result;
        console.log(this.list);
      } else {

      }
    })
  }

  changeAddress(id) {
    let api = 'api/changeDefaultAddress';
    let userInfo = this.toolsProvider.getUserInfo();
    let json = {
      uid: userInfo['_id'],
      salt: userInfo.salt,
      id: id
    }
    let sign = this.toolsProvider.sign(json);
    let postJson = {
      uid: userInfo['_id'],
      sign: sign,
      id: id
    }
    this.httpServiceProvider.doPost(api, postJson, (data) => {
      if (data.success) {
        this.navCtrl.pop();
      }
    })
  }

  //删除数据
  deleteAddress(key, id) {
    let that: any = this;
    let confirm = this.alertCtrl.create({
      title: '提示信息?',
      message: '您确定要删除吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            // console.log(key,id);
            //服务器删除
            that.deleteAddressAction(key, id);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteAddressAction(key, address_id) {
    let userInfo = this.toolsProvider.getUserInfo();
    let json = {
      uid: userInfo['_id'],
      salt: userInfo['salt'],
      id: address_id
    }
    let sign = this.toolsProvider.sign(json);
    let api = 'api/deleteAddress';
    //请求数据
    this.httpServiceProvider.doPost(api, {
      uid: userInfo['_id'],
      sign: sign,
      id: address_id
    }, (data) => {
      if (data.success) {   /*成功*/
        this.list.splice(key, 1);
      } else {
        alert(data.message);
      }

    })

  }

  //编辑页面
  editAddress(item) {
    this.navCtrl.push(EditAddressPage, {
      item: item
    })
  }

}
