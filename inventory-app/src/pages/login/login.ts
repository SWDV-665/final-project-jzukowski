import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {AuthenticateUserProvider} from '../../providers/authenticate-user/authenticate-user';
import { Storage } from '@ionic/storage';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { ModalCreateUserPage } from '../modal-create-user/modal-create-user';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username = "";
  password = "";

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, public sessionSnv: SessionServiceProvider, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthenticateUserProvider, private storage: Storage) {
    authProvider.dataChanged$.subscribe((dataChanged: boolean) => {
      if (authProvider.users.length > 0) {
        this.storage.set("userId", authProvider.users[0]._id).then(() => {
          sessionSnv.isUserAuthenticated(true);
        });
      }
      else {
        console.log('no user')
      }
    });
  }

  ionViewDidLoad() {
    this.storage.get("userId").then((val) => {
      if (val !== null) this.sessionSnv.isUserAuthenticated(true);
    })
  }

  login() {
    let data = {'username': this.username, 'password': this.password};
    this.authProvider.login(data);
  }

  createaccount() {
    let modal = this.modalCtrl.create(ModalCreateUserPage);
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        this.authProvider.createUser(data);

        const toast = this.toastCtrl.create({
          message: `user account has been created`,
          duration: 3000
        });
        toast.present();
      }
    });
    modal.present();
  }
}
