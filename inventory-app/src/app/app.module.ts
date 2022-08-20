import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { InventoryPage } from '../pages/inventory/inventory';
import { ModalInventoryItemPage } from '../pages/modal-inventory-item/modal-inventory-item';
import { ModalCreateUserPage } from '../pages/modal-create-user/modal-create-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InventoryServiceProvider } from '../providers/inventory-service/inventory-service';
import { AuthenticateUserProvider } from '../providers/authenticate-user/authenticate-user';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { InputDialogServiceProvider } from '../providers/input-dialog-service/input-dialog-service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AvailableFilterPipe } from '../pipes/available-filter/available-filter';
import { SessionServiceProvider } from '../providers/session-service/session-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    InventoryPage,
    ModalInventoryItemPage,
    ModalCreateUserPage,
    AvailableFilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    InventoryPage,
    ModalInventoryItemPage,
    ModalCreateUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InventoryServiceProvider,
    AuthenticateUserProvider,
    SocialSharing,
    BarcodeScanner,
    InputDialogServiceProvider,
    SessionServiceProvider
  ]
})
export class AppModule {}
