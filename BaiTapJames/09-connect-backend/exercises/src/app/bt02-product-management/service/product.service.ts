import {Injectable} from '@angular/core';
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:3000/products"

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(product): Observable<any> {
    return this.httpClient.post(this.url, product);
  }

  findById(id: string | number): Observable<any> {
    return this.httpClient.get(this.url + "?id=" + id);
  }

  update(obj: Product): Observable<any> {
    return this.httpClient.put(this.url + "/" + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
