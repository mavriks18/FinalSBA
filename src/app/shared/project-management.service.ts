import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { observable, Observable } from 'rxjs';
import { Project } from './models/project.model'
import { Task } from './models/task.model'
import { Users } from './models/users.model'
import { ParentTask } from './models/parent-task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {  
  selectedProject: Project;
  selectedTask: Task;
  selectedUser: Users;
  projectList: Project[];
  taskList: Task[];
  usersList: Users[];
  parentTasks : ParentTask[];
  

  readonly baseURL = "http://localhost:3000/projectDetails"
  readonly userDetailbaseURL = "http://localhost:3000/userDetails"
  readonly taskDetailbaseURL = "http://localhost:3000/taskDetails"
  constructor(private http: HttpClient) {
  }

  postProjectDetail(project: Project) {
    
    return this.http.post(this.baseURL + '/addproject', project).subscribe((res) => { }, (error) => { console.log(error) });
  }  
  postSuspendProject(id:string) {    
    var params = new HttpParams().set('projectId', id);   
    return this.http.get(this.baseURL + '/suspendProject', { params }).subscribe((res)=>{ console.log(res)}, (error) => {console.log(error)});       
  } 
  getProjectDetail(id) {
    var params = new HttpParams().set('id', id);
    return this.http.get<Project>(this.baseURL + '/getProject', { params })
  }  
  getAllProjects(sortField) {
    var params = new HttpParams().set('sort', sortField);    
    return this.http.get(this.baseURL + '/getAllProjects', { params });
  }

  postParentTaskDetail(task: Task) {    
    return this.http.post(this.taskDetailbaseURL + '/addParentTask', task).subscribe((res) => { }, (error) => { console.log(error) });
  }
  postTaskDetail(task: Task) {
    return this.http.post(this.taskDetailbaseURL + '/addTask', task).subscribe((res) => { }, (error) => { console.log(error) });
  }

  getTaskDetail(id: string) {
    var params = new HttpParams().set('id', id);
    return this.http.get(this.taskDetailbaseURL + '/getTask' , {params});
  }


  getTaskListForProject(id: string, sort :string) {   
    return this.http.get(this.taskDetailbaseURL + '/getTaskForProjectId?id='+id+'&sort='+sort);
  }

  deleteTask(id: string) {
    return this.http.delete(this.taskDetailbaseURL + '/deleteTask/' + id);
  }

  getAllTasks() {
    return this.http.get(this.taskDetailbaseURL + '/getAllTasks');
  }

  getAllParentTasksForProject(projectId: string) {
    var params = new HttpParams().set('projectId', projectId);
    return this.http.get(this.taskDetailbaseURL + '/getAllParentTasksForProject', {params});
  }

  postUserDetail(user: Users) {
    console.log(user);
    return this.http.post(this.userDetailbaseURL + '/addUser', user).subscribe((res) => { }, (error) => { console.log(error) });
  }

  getUserDetail(id: string) {
    var params = new HttpParams().set('id', id);
    return this.http.get(this.userDetailbaseURL + '/getUser', { params });
  }

  deleteUser(id: string) {
    var params = new HttpParams().set('id', id);
    return this.http.delete(this.userDetailbaseURL + '/deleteUser', { params }).subscribe((res) => { }, (error) => { console.log(error) });
  }

  getAllUsers(sortField: string) {
    var params = new HttpParams().set('sort', sortField);
    return this.http.get(this.userDetailbaseURL + '/getAllUsers', { params });
  }

}

