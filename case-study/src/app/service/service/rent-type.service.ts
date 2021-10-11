import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RentType} from '../model/rent-type';

@Injectable({
  providedIn: 'root'
})
export class RentTypeService {
  url = environment.rentTpeUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(rentType: RentType): Observable<any> {
    return this.httpClient.post(this.url, rentType);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '?id=' + id);
  }

  update(obj: RentType): Observable<any> {
    return this.httpClient.put(this.url + '/' + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
