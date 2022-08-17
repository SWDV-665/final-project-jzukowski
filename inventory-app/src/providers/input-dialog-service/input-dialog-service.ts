import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';
import { Storage } from '@ionic/storage';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController, public inventoryService: InventoryServiceProvider, private storage: Storage) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    
    const prompt = this.alertCtrl.create({
      title: item ? "Edit Inventory" : "Add Inventory",
      message: item ? "Please edit inventory..." : "Please enter inventory...",
      inputs: [
        {
          name: "name",
          value: item ? item.name : null
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancelled");
          }
        },
        {
          text: "Save",
          handler: data => {

            this.storage.get("userId").then((val) => {
              console.log(data);
              //data.set("userId", val);
              data = {"name": data.name, "userId": val};

              if (index !== undefined){
                this.inventoryService.editInventory(data, index)
              }
              else {
                this.inventoryService.addInventory(data);
              }
              console.log("saved");
            });
            
          }
        }
      ],
    });
    prompt.present();
    

    /*
    let modal = this.modalCtrl.create(ModalGroceryItemPage, {item: item}, {cssClass : 'select-modal'});
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        if (index === undefined)
          this.dataService.addItem(data);
        else {
          this.dataService.editItem(data, index);
        }
      }
    });
    modal.present();
    */
  }

}
