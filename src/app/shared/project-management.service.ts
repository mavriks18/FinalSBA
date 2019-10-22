import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { observable, Observable } from 'rxjs';
import { ParentTask } from './models/parent-task.model'
import { Project } from './models/project.model'
import { Task } from './models/task.model'
import { Users } from './models/users.model'

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  selectedParentTask: ParentTask;
  selectedProject: Project;
  selectedTask: Task;
  selectedUser: Users;
  projectList: Project[];
  taskList: Task[];
  usersList: Users[];


  readonly baseURL = "http://localhost:3000/projectDetails"
  readonly userDetailbaseURL = "http://localhost:3000/userDetails"
  constructor(private http: HttpClient) {    
  }

  postProjectDetail(project: Project) {
    console.log(project);
    return this.http.post(this.baseURL + '/addproject', project).subscribe((res) => { }, (error) => { console.log(error) });
  }
  getProjectDetail(id)
  {
    var params = new HttpParams().set('id', id);
    return this.http.get<Project>(this.baseURL + '/getProject', { params })
  }  

  deleteProject(id: string) {
    return this.http.delete(this.baseURL + '/deleteProject/' + id);
  }
  getAllProjects(sortField) {
    var params = new HttpParams().set('sort', sortField);
    return this.http.get(this.baseURL + '/getAllProjects', { params });
  }
  postTaskDetail(task: Task) {
    return this.http.post(this.baseURL + '/addTask', task);
  }

  getTaskDetail(id: string) {
    return this.http.get(this.baseURL + '/getTask/' + id);
  }
  getTaskListForProject(id: string) {
    return this.http.get(this.baseURL + '/getTaskForProjectId/' + id);
  }
  editTask(task: Task) {
    return this.http.put(this.baseURL + '/editTask', task)
  }

  deleteTask(id: string) {
    return this.http.delete(this.baseURL + '/deleteTask/' + id);
  }

  getAllTasks() {
    return this.http.get(this.baseURL + '/getAllTasks');
  }

  postUserDetail(user: Users) {
    console.log(user);
    return this.http.post(this.userDetailbaseURL + '/addUser', user).subscribe((res) => { }, (error) => { console.log(error) });
  }

  getUserDetail(id: string) {
    var params = new HttpParams().set('id', id);
    return this.http.get(this.userDetailbaseURL + '/getUser' , {params});
  }

  deleteUser(id: string) {
    var params = new HttpParams().set('id', id);
    return this.http.delete(this.userDetailbaseURL + '/deleteUser' , {params}).subscribe((res) => { }, (error) => { console.log(error) });    
  }

  getAllUsers(sortField : string) {
    var params = new HttpParams().set('sort', sortField);
    return this.http.get(this.userDetailbaseURL + '/getAllUsers' , {params});
  }

}

