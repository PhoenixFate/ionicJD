import { Component, ViewChild, ElementRef} from '@angular/core';
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
  @ViewChild('myattr') myattr:ElementRef;
  public pet = true;
  public tabs = 'plist';
  public item:any={};
  public num=1;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider) {
    let id = navParams.get('id');
    this.requestData(id);
  }

  ionViewDidLoad() {
    this.bindEvent();
    //console.log('ionViewDidLoad ProductContentPage');
  }

  requestData(id) {
    this.item={};
    this.httpServiceProvider.requestDataJsonp('api/pcontent?id=' + id, (data) => {
      this.item=data['result'];
    })
  }

  bindEvent(){
    var attrDom=this.myattr.nativeElement;//doucuemnt.getElementById()
    attrDom.onclick=(e)=>{
      if(e.srcElement.nodeName=='SPAN'){
        var ele=e.target;//获取span标签
        var parentNode=ele.parentNode;//当前元素父节点
        var children=parentNode.children;
        for(let i=0;i<children.length;i++){
          children[i].className='';
        }
        ele.className='active';
      }
    }
  }

  addCart(){
    let productTitle=this.item.title;
    let productId=this.item['_id'];
    let productPic=this.item.pic;
    let productPrice=this.item.price;
    let productCount=this.num;
    //商品属性
    let productAttr='';
    let activeDom=document.getElementsByClassName('active');
    for(let i=0;i<activeDom.length;i++){
      productAttr+=" "+activeDom[i].innerHTML;
    }
    console.log(productAttr);
    let json={
      productTitle,
      productId,
      productPic,
      productPrice,
      productCount,
      productAttr
    }
    console.log(json);
  }

  addNumber(){
    this.num++;
  }

  minusNumber(){
    if(this.num<=1){

    }else {
      this.num-=1;
    }
   
  }


}
