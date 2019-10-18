import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {observable} from 'rxjs';
import {ParentTask} from './models/parent-task.model'
import {Project} from './models/project.model'
import {Task} from './models/task.model'
import {Users} from './models/users.model'
@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  selectedParentTask : ParentTask;
  selectedProject : Project;
  selectedTask : Task;
  selectedUser : Users;
  projectList : Project[];
  taskList : Task[];
  usersList: Users[];
readonly baseURL = "http://localhost:3000/projectDetails"
  constructor( private http: HttpClient) { }

  postProjectDetail(project : Project)
  {
    return this.http.post(this.baseURL + '/addProject', project);
  }

  getProjectDetail(id : string)
  {
    return this.http.get(this.baseURL + '/getProject/' + id );
  }

  editProject(project : Project)
  {
    return this.http.put(this.baseURL + '/editProject' ,project )
  }

  deleteProject(id:string)
  {
    return this.http.delete(this.baseURL +'/deleteProject/'+id);
  }

  postTaskDetail(task : Task)
  {
    return this.http.post(this.baseURL + '/addTask', task);
  }

  getTaskDetail(id : string)
  {
    return this.http.get(this.baseURL + '/getTask/' + id );
  }

  editTask(task : Task)
  {
    return this.http.put(this.baseURL + '/editTask' ,task )
  }

  deleteTask(id:string)
  {
    return this.http.delete(this.baseURL +'/deleteTask/'+id);
  }

  postUserDetail(user : Users)
  {
    return this.http.post(this.baseURL + '/addUser', user);
  }

  getUserDetail(id : string)
  {
    return this.http.get(this.baseURL + '/getUser/' + id );
  }

  editUser(task : Task)
  {
    return this.http.put(this.baseURL + '/editUser' ,task )
  }

  deleteUser(id:string)
  {
    return this.http.delete(this.baseURL +'/deleteUser/'+id);
  }
  

}
