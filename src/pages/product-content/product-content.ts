import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the ProductContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-content',
  templateUrl: 'product-content.html',
})
export class ProductContentPage {
  public pet = true;
  public tabs = 'plist';
  public list = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider) {
    let id = navParams.get('id');
    this.requestData(id);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductContentPage');
  }

  requestData(id) {
    this.list = [];
    this.httpServiceProvider.requestDataJsonp('api/pcontent?id=' + id, (data) => {
      this.list.push(data['result']);
    })
  }

}
