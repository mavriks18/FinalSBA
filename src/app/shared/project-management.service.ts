import { Injectable, ErrorHandler } from '@angular/core';
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
  constructor( private http: HttpClient) {
    this.selectedProject = {
      
      project_id : "",
      project :"",
      priority :"",
      start_date: new Date(),
      end_date : new Date(),
      manager :""
    }
   }

  postProjectDetail(project : Project)
  {
    console.log(project);
    return this.http.post(this.baseURL   , project).subscribe((res)=>{}, (error) => {console.log(error)});
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
  getAllProjects()
  {
    return this.http.get(this.baseURL +'/getAllProjects');
  }
  postTaskDetail(task : Task)
  {
    return this.http.post(this.baseURL + '/addTask', task);
  }

  getTaskDetail(id : string)
  {
    return this.http.get(this.baseURL + '/getTask/' + id );
  }
  getTaskListForProject(id:string)
  {
    return this.http.get(this.baseURL + '/getTaskForProjectId/' + id );
  }
  editTask(task : Task)
  {
    return this.http.put(this.baseURL + '/editTask' ,task )
  }

  deleteTask(id:string)
  {
    return this.http.delete(this.baseURL +'/deleteTask/'+id);
  }

  getAllTasks()
  {
    return this.http.get(this.baseURL + '/getAllTasks');
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
  
  getAllUsers()
  {
    return this.http.get(this.baseURL +'/getAllUsers');
  }

}
