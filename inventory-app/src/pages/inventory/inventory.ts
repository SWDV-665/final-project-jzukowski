import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ModalInventoryItemPage } from '../modal-inventory-item/modal-inventory-item';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';

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
  items = [];
  errorMessage: string;
  status = "available";
  filterargs = {available: true};
  ffilterargs = {available: false};

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public inventoryService: InventoryServiceProvider) {
    this.id = navParams.get('id');
    this.item = navParams.get('item');

    inventoryService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getInventoryItems(this.id).subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    );
  }

  removeItem(id) {
    this.inventoryService.removeInventoryItem(id);
  }
  
  editItem(item, id) {
    this.openModal(item, id);
  }

  addItem() {
    this.openModal();
  }

  openModal(item?, id?) {
    let modal = this.modalCtrl.create(ModalInventoryItemPage, {item: item}, {cssClass : 'select-modal'});
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        if (id === undefined) {
          this.inventoryService.addInventoryItem({name: data.name, quantity: data.quantity, code: data.code, inventoryId: this.id, available: data.available});
        }
        else {
          this.inventoryService.editInventoryItem({name: data.name, quantity: data.quantity, code: data.code, inventoryId: this.id, available: data.available}, id)
        }
      }
    });
    modal.present();
  }

}
