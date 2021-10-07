import {Injectable} from '@angular/core';
import {Category} from "../model/category";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000/categories"

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  saveCategory(category): Observable<any> {
    return this.httpClient.post(this.url, category);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + "?id=" + id);
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(this.url + "/" + category.id, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
