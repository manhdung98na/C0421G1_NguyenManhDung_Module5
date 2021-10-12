import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = environment.employeeUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllAvailable(): Observable<any> {
    return this.httpClient.get(this.url + '?isDeleted=false&_sort=id&_order=asc');
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(object: Employee): Observable<any> {
    return this.httpClient.post(this.url, object);
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + '?id=' + id);
  }

  update(object: Employee): Observable<any> {
    return this.httpClient.put(this.url + '/' + object.id, object);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  search(type?: string, name?: string): Observable<any> {
    let sql = '';
    if (type != null && name != null) {
      sql = this.url + '?name_like=' + name + '&rentType.name=' + type +"&isDeleted=false&_sort=id&_order=asc";
    } else if (type == null) {
      sql = this.url + '?name_like=' + name +"&isDeleted=false&_sort=id&_order=asc";
    } else {
      sql = this.url + '?rentType.name=' + type +"&isDeleted=false&_sort=id&_order=asc";
    }
    console.log(sql);
    return this.httpClient.get(sql);
  }
}
