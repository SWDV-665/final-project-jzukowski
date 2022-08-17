import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalInventoryItemPage } from './modal-inventory-item';

@NgModule({
  declarations: [
    ModalInventoryItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalInventoryItemPage),
  ],
})
export class ModalInventoryItemPageModule {}
