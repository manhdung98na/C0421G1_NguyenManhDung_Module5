import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarType} from '../model/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
  url = environment.moviesUrl;
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(movie: CarType): Observable<any> {
    return this.httpClient.post(this.url, movie);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + "?id=" + id);
  }

  update(obj: CarType): Observable<any> {
    return this.httpClient.put(this.url + "/" + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
