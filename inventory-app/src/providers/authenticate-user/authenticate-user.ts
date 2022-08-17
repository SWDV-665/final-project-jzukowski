import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

/*
  Generated class for the AuthenticateUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticateUserProvider {

  users = [];
  baseURL = "http://localhost:8080";

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticateUserProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  login(data){
    return this.http.post(this.baseURL + "/api/users", data).subscribe(data => {
      this.users = <any>data;
      this.dataChangeSubject.next(true);
    });
  }
}
