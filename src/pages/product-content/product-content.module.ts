import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductContentPage } from './product-content';

@NgModule({
  declarations: [
    ProductContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductContentPage),
  ],
})
export class ProductContentPageModule {}
