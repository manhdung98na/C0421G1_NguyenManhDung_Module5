import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarType} from '../model/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {
  url = environment.carTypeUrl;
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

}
