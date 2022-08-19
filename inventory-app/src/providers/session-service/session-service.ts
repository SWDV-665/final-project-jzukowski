import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionServiceProvider {

  isLoggedIn$: Observable<boolean>;
  private isLoggedInSubject: Subject<boolean>;

  constructor() {
    this.isLoggedInSubject = new Subject<boolean>();
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable(); 
  }

  isUserAuthenticated(bool) {
    this.isLoggedInSubject.next(bool);
  }

}
