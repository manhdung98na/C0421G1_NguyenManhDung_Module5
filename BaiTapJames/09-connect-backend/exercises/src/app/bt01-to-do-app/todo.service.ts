import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL = "http://localhost:3000/todo";

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + "?id=" + id);
  }

  add(todo: Todo): Observable<any> {
    return this.httpClient.post(this.API_URL, todo);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL + "/" + id);
  }

  toggle(todo: Todo): Observable<any> {
    return this.httpClient.put<Todo>(this.API_URL + "/" + todo.id, {
      id: todo.id,
      content: todo.content,
      completed: !todo.completed
    });
  }
}
