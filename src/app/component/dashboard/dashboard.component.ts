import {Component, OnInit} from '@angular/core';
import {CrudService} from "../../service/crud.service";
import {Task} from "../../model/task";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  taskObj: Task = new Task();
  tasksArr: Task[] = [];


  currentTask: Task = this.taskObj;
  modalDelete: boolean = false;
  modalEdit: boolean = false;
  modalAdd: boolean = false;
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.getAllTasks();
  };

  modalOpennerAdd() {
    this.modalAdd = !this.modalAdd;
    this.modalEdit = false;
  };

  modalOpennerRemove(taskid?: number) {
    const findTask = this.tasksArr.find(task => taskid === task.id);
    if (typeof findTask !== 'undefined') {
      this.currentTask = findTask
    }
    this.modalDelete = !this.modalDelete;
  };

  modalOpennerEdit(taskId?: number) {
    const findTask = this.tasksArr.find(task => taskId === task.id);

    if (typeof findTask !== 'undefined') {
      this.currentTask = findTask;
    }

    this.editTaskValue = this.currentTask.title;
    this.modalAdd = !this.modalAdd;
    this.modalEdit = !this.modalEdit;
  };

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(response => {
      this.tasksArr = response;

    }, error => {
      console.log(error)
    });
  };

  addTask() {
    const newTask = {
      id: Math.random(),
      title: this.addTaskValue,
      completed: false,
    }

    this.tasksArr.unshift(newTask)
    this.modalAdd = false;
    this.crudService.addTask(this.taskObj).subscribe(r => {
      this.addTaskValue = '';
    }, error => {
      console.log(error)
    });
  };

  editTask(taskId: number,  isComplete: boolean = false) {
    const findTask = this.tasksArr.find(task => taskId === task.id);
    if (typeof findTask !== 'undefined') {
      this.currentTask = findTask
      this.currentTask.completed = isComplete;
    }

    if (this.editTaskValue) {
      this.currentTask.title = this.editTaskValue;
    }

    this.tasksArr = [this.currentTask, ...this.tasksArr.filter(task => task.id !== this.currentTask.id)];
    this.crudService.editTask(this.currentTask).subscribe(error => {
      console.log(error);
    });
    this.editTaskValue = '';
    this.modalEdit = false;
    this.modalAdd = false;
  };

  deleteTask(taskId: number) {
    this.modalDelete = false;
    this.tasksArr = this.tasksArr.filter(taskToRemover => taskToRemover.id !== taskId);
    const taskById = this.tasksArr.find(taskToRemove => taskToRemove.id === taskId )
    if (typeof taskById !== 'undefined') {
      this.crudService.deleteTask(taskById). subscribe(r => {
      }, error => {
        console.log(error)
      });
    }
  };
}
