import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the InventoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryServiceProvider {

  items = [];
  baseURL = "http://localhost:8080";

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello InventoryServiceProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getInventories(): Observable<object[]> {
    //return this.items;
    return this.http.get(this.baseURL + "/api/inventories").pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  removeInventory(index) {
    this.http.delete(this.baseURL + "/api/inventories/" + index).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  addInventory(data) {
    this.http.post(this.baseURL + "/api/inventories", data).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  editInventory(data, index) {
    this.http.put(this.baseURL + "/api/inventories/" + index, data).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg : string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
