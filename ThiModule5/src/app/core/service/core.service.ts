import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Core} from '../model/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  url = environment.showTimesUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllAvailable(): Observable<any> {
    return this.httpClient.get(this.url + '?isDeleted=false&_sort=id&_order=asc');
  }
  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(showtime: Core): Observable<any> {
    return this.httpClient.post(this.url, showtime);
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + '?id=' + id);
  }

  update(obj: Core): Observable<any> {
    return this.httpClient.put(this.url + '/' + obj.id, obj);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  search(type?: string, id?: string): Observable<any> {
    let sql = '';
    if (type != null && id != null) {
      sql = this.url + '?id_like=' + id + '&movie.name=' + type + "&isDeleted=false&_sort=id&_order=asc";
    } else if (type == null) {
      sql = this.url + '?id_like=' + id + "&isDeleted=false&_sort=id&_order=asc";
    } else {
      sql = this.url + '?movie.name=' + type + "&isDeleted=false&_sort=id&_order=asc";
    }
    return this.httpClient.get(sql);
  }
}
