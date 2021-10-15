import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url = environment.showTimesUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllAvailable(): Observable<any> {
    return this.httpClient.get(this.url + '?isDeleted=false&_sort=id&_order=asc');
  }
  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(showtime: Car): Observable<any> {
    return this.httpClient.post(this.url, showtime);
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + '?id=' + id);
  }

  update(obj: Car): Observable<any> {
    return this.httpClient.put(this.url + '/' + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  search(type: string, content: string): Observable<any> {
    let sql = '';
    switch (type) {
      case 'id':
        sql = this.url + '?id=' + content + "&isDeleted=false&_sort=id&_order=asc";
        break;
      case 'name':
        sql = this.url + '?tickets_like=' + content + "&isDeleted=false&_sort=id&_order=asc";
        break;
    }
    return this.httpClient.get(sql);
  }
}
