import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url = environment.carUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  add(car: Car): Observable<any> {
    return this.httpClient.post(this.url, car);
  }

  findById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(this.url + '/detail/' + id);
  }

  update(id: number, obj: Car): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, obj);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/delete/' + id);
  }

  search(type: string, content: string): Observable<any> {
    let sql = this.url + '/search?type=' + type + '&content=' + content;
    return this.httpClient.get(sql);
  }
}
