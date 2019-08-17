import { Component, OnInit } from '@angular/core';

import {HttpService} from './http.service'; // inject dependency so we can use the service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN';
  tasks;
  task;
  showingTasks = false;

  mode;

  selectedTask: any;

  newTask: any;
  updatedTask: any;
  
  chosenTask = false;

  constructor(private _httpService: HttpService) {} // make the service an attribute in the class
  ngOnInit() {
    this.newTask = {title: '', description:''}
    this.updatedTask = {title: '', description:''}
    
  }

  onSubmitNew() {
    let task = this._httpService.create(this.newTask);
    task.subscribe(data => {
      console.log(data);
      this.ngOnInit();
      this.getTasksFromService();
    })
    
  }

  onSubmitUpdate() {
    let task = this._httpService.edit(this.selectedTask, this.updatedTask);
    task.subscribe(data => {
      console.log(data);
      this.ngOnInit();
      this.getTasksFromService();
      this.mode = 'show';
    })
  }


  onEdit(_id, title, description) {
    this.updatedTask.title = title;
    this.updatedTask.description = description;
    
    if (this.selectedTask && this.mode  == 'edit') {
      this.selectedTask = undefined;
    }
    else {
      this.selectedTask = _id;
    }
    this.mode = 'edit';
  }

  onShow(_id) {
    if (this.selectedTask==_id && this.mode  == 'show') {
      this.selectedTask = undefined;
    }
    else {
      this.selectedTask = _id;
    }
    this.mode = 'show';
  }

  getTasksFromService() {
    let tasks = this._httpService.getTasks(); // first thing service will do is invoke the function
    tasks.subscribe(data => {
      this.tasks = data;
      console.log(data)
      console.log('tasks', this.tasks)
    });

  }

  getTaskFromService(_id) {
    let task = this._httpService.getTask(_id);
    task.subscribe(data => {
      console.log(data)
      this.task = data;
    });
  }

  showTasks() {
    if (!this.tasks) {
      this.getTasksFromService();
    }
    this.showingTasks = !this.showingTasks;
  }

  showTask(_id) {
    this.chosenTask = !this.chosenTask;
    if (this.chosenTask) {
      this.getTaskFromService(_id);
    }
  }

  deleteTask(_id) {
    let task = this._httpService.delete(_id);
    task.subscribe(data => {
      console.log(data);
      this.getTasksFromService();
    })
  }
}
