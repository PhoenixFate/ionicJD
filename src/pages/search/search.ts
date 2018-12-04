import { StorageProvider } from './../../providers/storage/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Content) content: Content;

  public myInput;
  public flag = false;
  public list = [];
  public page = 1;
  public hasData = true;
  public historyList = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public httpServiceProvider: HttpServiceProvider,
    public storageProvider: StorageProvider,
    public alertController: AlertController) {
    this.getHistory();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchPage');
  }

  getSearchList(infiniteScroll) {
    if (infiniteScroll) {

    } else {
      this.page = 1;
      this.hasData = true;
      this.content.scrollToTop(0);
      this.saveHistory();
    }
    this.httpServiceProvider.requestDataJsonp('api/plist?search=' + this.myInput + '&page=' + this.page, (data) => {
      if (this.page == 1) {
        this.list = data.result;
      } else {
        this.list = this.list.concat(data.result);
      }
      this.flag = true;
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (data.result.length < 10) {
          this.hasData = false;
        }
      }
      this.page++;
    })
  }


  doInfinite(infiniteScroll) {
    this.getSearchList(infiniteScroll);
  }


  saveHistory() {
    var history = this.storageProvider.get('historyData');
    if (history) {
      if (history.indexOf(this.myInput) == -1) {
        history.push(this.myInput);
        this.storageProvider.set('historyData', history);
      } else {

      }
    } else {
      this.historyList.push(this.myInput);
      this.storageProvider.set('historyData', this.historyList);
    }
  }

  getHistory() {
    var history = this.storageProvider.get('historyData');
    if (history) {
      this.historyList = history;
    }
  }

  //点击历史记录跳转到搜索
  goSearch(keywords) {
    this.myInput = keywords;
    this.getSearchList('');
  }

  removeHistory(keywords) {
    //提示是否删除
    let alert = this.alertController.create({
      title: '',
      message: '是否删除?',
      buttons: [
        {
          text: '否',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            var index = this.historyList.indexOf(keywords);
            this.historyList.splice(index, 1);
            this.storageProvider.set('historyData', this.historyList);
          }
        }
      ]
    });
    alert.present();

  }
}
