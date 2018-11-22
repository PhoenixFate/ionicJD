import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public recList = [];
  public cateList = [];
  constructor(public navCtrl: NavController) {
    for (let i = 0; i < 10; i++) {
      this.recList.push({
        pic: 'assets/imgs/0' + i + '.jpg',
        title: '第' + i + '条'
      })
    }
    for (let i = 0; i < 19; i++) {
      this.cateList.push(`分类${i}`);
    }
  }

}
