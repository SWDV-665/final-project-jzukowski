import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateUserPage } from './modal-create-user';

@NgModule({
  declarations: [
    ModalCreateUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateUserPage),
  ],
})
export class ModalCreateUserPageModule {}
