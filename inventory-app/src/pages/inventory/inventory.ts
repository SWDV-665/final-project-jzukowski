import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ModalInventoryItemPage } from '../modal-inventory-item/modal-inventory-item';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  id: number;
  item;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  addItem() {
    this.openModal();
  }

  openModal(index?, item?) {
    let modal = this.modalCtrl.create(ModalInventoryItemPage, {item: item}, {cssClass : 'select-modal'});
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        //if (index === undefined)
          //this.dataService.addItem(data);
        //else {
          //this.dataService.editItem(data, index);
        //}
      }
    });
    modal.present();
  }

}
