import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../model/task"
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  todoServiceURL: string;
  userServiceUrl: string;

  constructor(private http: HttpClient) {
    this.todoServiceURL = "https://jsonplaceholder.typicode.com/todos";
    this.userServiceUrl = "https://jsonplaceholder.typicode.com/users";
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userServiceUrl, user);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.todoServiceURL, task);
  };

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.todoServiceURL);
  };

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.todoServiceURL + '/' + task.id);
  };

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.todoServiceURL + '/' + task.id, task);
  };


}
