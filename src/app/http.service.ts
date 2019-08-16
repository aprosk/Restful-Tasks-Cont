import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // to make http requests

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {  // we are making HttpClient an attribute in the class, so we can use it's methods
    
  } 

  getTasks() {
    return this._http.get('/tasks');
  }

  getTask() {
    return this._http.get('/tasks/:_id');
  }
}
