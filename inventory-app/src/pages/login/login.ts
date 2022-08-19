import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthenticateUserProvider} from '../../providers/authenticate-user/authenticate-user';
import { Storage } from '@ionic/storage';
import { SessionServiceProvider } from '../../providers/session-service/session-service';

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

  constructor(public sessionSnv: SessionServiceProvider, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthenticateUserProvider, private storage: Storage) {
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

}
