import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  code;
  inventoryItem = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public inventoryService: InventoryServiceProvider) {
    inventoryService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadData();
    });
  }

  scanforitem() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      this.loadData();

     }).catch(err => {
         console.log('Error', err);
     });
  }

  loadData() {
    this.inventoryService.getInventoryItemByCode(this.code).subscribe(
      items => this.inventoryItem = items,
      error => this.errorMessage = <any>error
    );
  }

  setstatus(data, id, flag) {
    data.available = flag;
    this.inventoryService.editInventoryItem(data, id);
  }

}
