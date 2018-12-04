import { ProductListPage } from './../product-list/product-list';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public leftCate=[];//左侧分类数据
  public rightCate=[];//右侧分类数据
  myInput;
  public ProductListPage=ProductListPage;

  constructor(public navCtrl: NavController,
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider) {
    this.getLeftData();
  }

  getLeftData(){
    let api='api/pcate';
    this.httpServiceProvider.requestDataJsonp(api,(data)=>{
      this.leftCate=data.result;
      this.getRightData(this.leftCate[0]['_id']);
    })
  }

  getRightData(pid){
    let api='api/pcate?pid='+pid;
    this.httpServiceProvider.requestDataJsonp(api,(data)=>{
      this.rightCate=data.result;
      console.log(this.rightCate);
    })
  }

  

}
