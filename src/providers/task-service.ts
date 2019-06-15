import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Task } from './task.model';

const SERVER_URL = 'https://rocky-beach-17461.herokuapp.com';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider {

  options: RequestOptions;

  constructor(public http: Http) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic YW5uYTp3ZXJlLWtlcHQtZmlndXJl');

    this.options = new RequestOptions({ headers });
  }

  getList() {
    return this.http.get(`${SERVER_URL}/tasks`, this.options)
      .map(res => res.json())
      .map(result => {
        return result.map((entry) => {
          return new Task(entry['_id'], entry['text'], entry['completed']);
        })
      });
  }

  updateTask(task: Task) {
    return this.http.put(`${SERVER_URL}/tasks/${task.id}`, task, this.options)
      .map(res => res.json());
  }

  addTask(task: Task) {
    return this.http.post(`${SERVER_URL}/tasks`, task, this.options)
      .map(res => res.json());
  }

  deleteTask(task: Task) {
    return this.http.delete(`${SERVER_URL}/tasks/${task.id}`, this.options)
      .map(res => res.json());
  }

}
