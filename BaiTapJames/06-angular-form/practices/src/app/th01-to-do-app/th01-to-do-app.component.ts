import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {FormControl, FormGroup, Validators} from '@angular/forms';

let _id = 1;

@Component({
  selector: 'app-th01-to-do-app',
  templateUrl: './th01-to-do-app.component.html',
  styleUrls: ['./th01-to-do-app.component.css']
})
export class Th01ToDoAppComponent implements OnInit {
  todos: Todo[] = [];
  content = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleTodo(i: number) {
    this.todos[i].complete = !this.todos[i].complete;
  }

  change() {
    const value = this.content.value;
    if (value) {
      const todo: Todo = {
        id: _id++,
        content: value,
        complete: false
      };
      this.todos.push(todo);
      this.content.reset();
    }
  }
}
