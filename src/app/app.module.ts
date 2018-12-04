import { ProductContentPage } from './../pages/product-content/product-content';
import { ProductListPage } from './../pages/product-list/product-list';
import { SearchPage } from './../pages/search/search';
import { LoginPage } from './../pages/login/login';
import { UserPage } from './../pages/user/user';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule, JsonpModule } from '@angular/http';

import { CategoryPage } from '../pages/category/category';
import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterCodePage } from '../pages/register-code/register-code';
import { RegisterPage } from '../pages/register/register';
import { RegisterPasswordPage } from '../pages/register-password/register-password';

import { ConfigProvider } from '../providers/config/config';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    CartPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterCodePage,
    RegisterPage,
    RegisterPasswordPage,
    SearchPage,
    ProductListPage,
    ProductContentPage
  ],
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true',
      backButtonText:''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    CartPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterCodePage,
    RegisterPage,
    RegisterPasswordPage,
    SearchPage,
    ProductListPage,
    ProductContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConfigProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    StorageProvider,
    
  ]
})
export class AppModule {}
