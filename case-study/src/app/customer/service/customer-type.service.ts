import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {
  url = environment.customerTypeUrl;
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(customer: Customer): Observable<any> {
    return this.httpClient.post(this.url, customer);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + "?id=" + id);
  }

  update(obj: Customer): Observable<any> {
    return this.httpClient.put(this.url + "/" + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
