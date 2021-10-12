import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Division} from '../model/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  url = environment.divisionUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(object: Division): Observable<any> {
    return this.httpClient.post(this.url, object);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '?id=' + id);
  }

  update(object: Division): Observable<any> {
    return this.httpClient.put(this.url + '/' + object.id, object);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
