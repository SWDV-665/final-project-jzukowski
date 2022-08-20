import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalCreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-create-user',
  templateUrl: 'modal-create-user.html',
})
export class ModalCreateUserPage {

  username;
  password;
  confirmpassword;
  errorMessage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCreateUserPage');
  }

  dismissModal() {
    this.viewCtrl.dismiss(); 
  }

  createAccount() {
    if (this.password === this.confirmpassword && this.password != undefined) {
      this.viewCtrl.dismiss({username: this.username, password: this.password});
    } else {
      this.errorMessage = "Passwords do not match";
    }
  }

}
