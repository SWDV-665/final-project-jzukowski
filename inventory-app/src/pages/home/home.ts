import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MenuController, App} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';
import { Storage } from '@ionic/storage';
import { InventoryPage } from '../inventory/inventory';
import { SessionServiceProvider } from '../../providers/session-service/session-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [];
  errorMessage: string;
  userId: string;
  
  constructor(public sessionSvc: SessionServiceProvider, public app: App, public menu: MenuController, public navCtrl: NavController, public toastCtrl: ToastController, public socialSharing: SocialSharing, public inputDialogService: InputDialogServiceProvider, public inventoryService: InventoryServiceProvider, private storage: Storage) {
    inventoryService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
    menu.enable(true);
  }

  ionViewDidLoad() {
    this.storage.get("userId").then((val) => {
      this.userId = val;
      this.loadItems();
    });
    
  }

  logout() {
    this.storage.remove("userId").then((val) => {
      this.sessionSvc.isUserAuthenticated(false);
    });
  }

  loadItems() {
    this.inventoryService.getInventories(this.userId).subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    );
  }

  removeItem(item, itemId) {
    const toast = this.toastCtrl.create({
      message: `${item.name} has been deleted`,
      duration: 3000
    });
    toast.present();

    this.inventoryService.removeInventory(itemId);
  }

  editItem(item, index) {
    const toast = this.toastCtrl.create({
      message: `Editing item ${item.name}`,
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
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

  inventorySelect(inventoryId, item) {
    this.navCtrl.push(InventoryPage, {id: inventoryId, item: item});
  }
}
