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

  constructor(private _httpService: HttpService) {} // make the service an attribute in the class
  ngOnInit() {
    this.getTasksFromService();
    // this.getTaskFromService();
    
  }

  getTasksFromService() {
    let tasks = this._httpService.getTasks(); // first thing service will do is invoke the function
    tasks.subscribe(data => {
      this.tasks = data;
      console.log(data)
      console.log('tasks', this.tasks)
    });

  }

  getTaskFromService() {
    let task = this._httpService.getTask();
    task.subscribe(data => {
      console.log(data)
    });
  }
}
