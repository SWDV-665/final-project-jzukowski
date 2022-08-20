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
  baseURL = "http://192.168.1.164:8080";//"http://localhost:8080";

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello InventoryServiceProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getInventories(userId): Observable<object[]> {
    //return this.items;
    return this.http.get(this.baseURL + "/api/inventories/" + userId).pipe(
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

  getInventoryItems(inventoryId): Observable<object[]> {
    //return this.items;
    return this.http.get(this.baseURL + "/api/inventories/items/" + inventoryId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addInventoryItem(data) {
    this.http.post(this.baseURL + "/api/inventories/items", data).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  editInventoryItem(data, index) {
    this.http.put(this.baseURL + "/api/inventories/items/" + index, data).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  removeInventoryItem(id) {
    this.http.delete(this.baseURL + "/api/inventories/items/" + id).subscribe(res => {
      this.items = <any>res;
      this.dataChangeSubject.next(true);
    });
  }

  getInventoryItemByCode(code): Observable<object[]> {
    //return this.items;
    return this.http.get(this.baseURL + "/api/inventories/items/code/" + code).pipe( 
      map(this.extractData),
      catchError(this.handleError)
    );
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
