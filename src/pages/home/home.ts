import { ProductContentPage } from './../product-content/product-content';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ProductContentPage=ProductContentPage;
  public focusList=[];//轮播图
  public recList = [];
  public bestList=[];//精品推荐数据
  public bestListWidth = '';//精品推荐宽度
  public hotList=[];//热门商品
  public myInput;
  public shouldShowCancel = true;
  constructor(public navCtrl: NavController,
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider,
    ) {
    this.getFocus();
    this.getBestProduct();
    this.getHotProduct();
  }

  goSearch() {
    this.navCtrl.push(SearchPage);
  }

  onInput() {
    this.navCtrl.push(SearchPage);
  }

  onCancel() {

  }

  getFocus(){
    this.httpServiceProvider.requestDataJsonp('api/focus',(data)=>{
      this.focusList=data.result;
    })
  }

  //精品推荐
  getBestProduct(){
    this.httpServiceProvider.requestDataJsonp('api/plist?is_best=1',(data)=>{
      this.bestList=data.result;
      this.bestListWidth = this.bestList.length * 92 + 'px';
    })
  }

  getHotProduct(){
    this.httpServiceProvider.requestDataJsonp('api/plist?is_hot=1',(data)=>{
      this.hotList=data.result;
    })
  }


}

