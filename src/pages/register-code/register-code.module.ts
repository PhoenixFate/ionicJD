import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCodePage } from './register-code';

@NgModule({
  declarations: [
    RegisterCodePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCodePage),
  ],
})
export class RegisterCodePageModule {}
