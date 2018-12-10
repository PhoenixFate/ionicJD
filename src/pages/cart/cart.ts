import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from './../../providers/storage/storage';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public list=[];
  constructor(public navCtrl: NavController,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider:StorageProvider) {

  }

  ionViewWillEnter(){
    console.log('enter');
    this.getCart();
  }

   getCart(){
    let cartData=this.storageProvider.get('cartData');
    if(!cartData){

    }else {
      this.list=cartData;
      console.log(this.list);
    }
   }

}
