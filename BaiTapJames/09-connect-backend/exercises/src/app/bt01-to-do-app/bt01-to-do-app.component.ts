import {Component, OnInit} from '@angular/core';
import {Todo} from './todo';
import {FormControl} from '@angular/forms';
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-th01-to-do-app',
  templateUrl: './bt01-to-do-app.component.html',
  styleUrls: ['./bt01-to-do-app.component.css']
})
export class Bt01ToDoAppComponent implements OnInit {
  todos: Todo[];
  content = new FormControl();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(next => {
      this.todos = next;
    })
  }

  toggleTodo(id: number) {
    this.todoService.findById(id).subscribe(next => {
      let todo = next[0];
      this.todoService.toggle(todo).subscribe(next => {
          this.ngOnInit();
        }
      )
    })
  }

  add() {
    const value = this.content.value;
    this.todoService.add({content: value, completed: false}).subscribe(next => {
      this.ngOnInit();
      this.content.reset();
    })
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe(next => {
      this.ngOnInit();
    })
  }
}
