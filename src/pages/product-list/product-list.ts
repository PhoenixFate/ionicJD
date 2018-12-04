import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  public list=[];
  public cid;
  public page=1;
  public myInput;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider,) {
    this.cid=this.navParams.get("cid");
    this.getProductList('');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductListPage');
  }

  getProductList(infiniteScroll){
    this.httpServiceProvider.requestDataJsonp('api/plist?cid='+this.cid+'&page='+this.page,(data)=>{
      this.list=this.list.concat(data.result);//数据拼接
      if(infiniteScroll){
        infiniteScroll.complete();
        if(data.result.length<10){
          infiniteScroll.enable(false);
        }
      }
      this.page++;
    })
  }

  doInfinite(infiniteScroll) {
    this.getProductList(infiniteScroll);
  }

}
