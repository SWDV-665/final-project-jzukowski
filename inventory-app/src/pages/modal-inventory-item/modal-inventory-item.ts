import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalInventoryItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-inventory-item',
  templateUrl: 'modal-inventory-item.html',
})
export class ModalInventoryItemPage {
  title;
  item;
  name;
  quantity;
  code;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.item = navParams.get("item");
    this.title = (this.item === undefined) ? "Add Inventory Item" : "Edit Inventory Item";
  }

  counter(i: number) {
    return new Array(i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInventoryItemPage');
  }

  dismissModal() {
    this.viewCtrl.dismiss(); 
  }

  saveModal() {
    this.viewCtrl.dismiss(); 
  }

}
