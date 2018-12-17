// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';
import { Md5 } from 'ts-md5/dist/md5';
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

  sign(json){
    console.log(json);
    let arr=[];
    for(let attr in json){
      arr.push(attr);
    }
    arr=arr.sort();
    let str='';
    for(let i=0;i<arr.length;i++){
      str+=arr[i]+json[arr[i]];
    }
    return Md5.hashStr(str);
  }
}
