// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(
    public storageProvider: StorageProvider,) {
    console.log('Hello ToolsProvider Provider');
  }

  getUserInfo(){
    let user=this.storageProvider.get('userinfo');
    return user;
  }
}
