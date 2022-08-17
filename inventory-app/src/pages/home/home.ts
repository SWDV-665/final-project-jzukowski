import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [];
  errorMessage: string;
  userId: string;
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public socialSharing: SocialSharing, public inputDialogService: InputDialogServiceProvider, public inventoryService: InventoryServiceProvider, private storage: Storage) {
    inventoryService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.storage.get("userId").then((val) => {
      this.userId = val;
      console.log("userId:",val);
      this.loadItems();
    });
    
  }

  loadItems() {
    this.inventoryService.getInventories(this.userId).subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    );
  }

  removeItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `${item.name} has been deleted`,
      duration: 3000
    });
    toast.present();

  }

  editItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Editing item ${item.name}`,
      duration: 3000
    });
    toast.present();

  }

  shareItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Sharing item ${item.name}`,
      duration: 3000
    });
    toast.present();

    let message = `Grocery Item - Name : ${item.name} - Quantity : ${item.quantity}`;
    let subject = "Shared via Groceries App";

    this.socialSharing.share(message, subject).then(() => {
      console.log("shared successfully");
      // Sharing via email is possible
    }).catch((error) => {
      console.error("Error while sharing ", error);
      // Sharing via email is not possible
    });
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }
}
