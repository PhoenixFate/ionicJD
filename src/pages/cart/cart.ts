import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from './../../providers/storage/storage';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public list = [];
  public allPrice = 0;
  public isChecked=false; //全选 反选
  public isEdit=false;//是否编辑
  public hasData=true;//默认有数据

  constructor(public navCtrl: NavController,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider: StorageProvider) {

  }

  ionViewWillEnter() {
    this.getCart();
    this.sumPrice();
    //this.checkAll();
  }

  ionViewWillLeave() {
    this.storageProvider.set('cartData', this.list);
  }

  getCart() {
    let cartData = this.storageProvider.get('cartData');
    if (!cartData) {

    } else {
      this.list = cartData;
    }
  }

  updageCart() {
    if(this.getCheckNumber()==this.list.length){
      this.isChecked=true;
    }else {
      this.isChecked=false;
    }
    this.sumPrice();
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

  incCount(item) {
    item.productCount++;
    this.sumPrice();
  }

  decCount(item) {
    if (item.productCount <= 1) {
      return false;
    }
    item.productCount--;
    this.sumPrice();
  }

  doPay() {
    //获取购物车选中的数据
    var tempArr = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked){
        tempArr.push(this.list[i]);
      }
    }
    if(tempArr.length>0){
      this.storageProvider.set('orderData',tempArr);
      this.navCtrl.push(OrderPage);
    }else {
      alert('您没有选中商品')
    }
  }

  //全选反选
  checkAll(){
    for(let i=0;i<this.list.length;i++){
      this.list[i].checked=this.isChecked;
    }
    
  }

  //获取选中的数量
  getCheckNumber(){
    let sum=0;
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].checked){
        sum+=1;
      }
    }
    return sum;
  }

  doDelete(){
    let noCheckedArr=[];
    for(let i=0;i<this.list.length;i++){
      if(!this.list[i].checked){
        noCheckedArr.push(this.list[i]);
      }
    }
    this.list=noCheckedArr;
    this.storageProvider.set('cartData',noCheckedArr);
    
  }
}
