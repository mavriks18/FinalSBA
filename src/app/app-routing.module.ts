import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {AddTaskComponent} from './components/add-task/add-task.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {TaskListComponent} from './components/task-list/task-list.component';

const routes: Routes = [  
  {path :'addProject', component:AddProjectComponent },
  {path :'addTask', component:AddTaskComponent },
  {path :'addUser', component:AddUserComponent },
  {path :'taskList', component:TaskListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
