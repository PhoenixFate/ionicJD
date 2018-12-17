import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToolsProvider } from './../../providers/tools/tools';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  public addressList = {
    name: '',
    phone: '',
    address: ''
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public httpServiceProvider: HttpServiceProvider,
    public toolsProvider: ToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  addAddress() {
    if (this.addressList.name == '' || this.addressList.phone == '' || this.addressList.address == '') {
      alert('空');
      return;
    }
    let userInfo = this.toolsProvider.getUserInfo();

    let json = {
      uid: userInfo._id,
      salt: userInfo.salt,
      name: this.addressList.name,
      phone: this.addressList.phone,
      address: this.addressList.address
    }

    let sign = this.toolsProvider.sign(json);
    let postJson = {
      uid: userInfo._id,
      sign: sign,
      name: this.addressList.name,
      phone: this.addressList.phone,
      address: this.addressList.address
    }
    this.httpServiceProvider.doPost('api/addAddress', postJson, (data) => {
      console.log(data);
    })
  }
}
