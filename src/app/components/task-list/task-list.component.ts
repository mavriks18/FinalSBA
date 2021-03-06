import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchProjectComponent } from '../search-project/search-project.component'
import {Task} from 'src/app/shared/models/task.model'
import {Project} from 'src/app/shared/models/project.model'
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  closeResult: string;
  currentDate: Date = new Date();
  isparent : boolean;  
  constructor(private projectManagementSvc: ProjectManagementService,
    private modalService: NgbModal, private router: Router) { }
  modalOptions: NgbModalOptions;
  chosenManager: string;
  sortdirection: string;
  ngOnInit() {   
    this.projectManagementSvc.selectedTask = {
      parent_id: "",
      task_id: "",
      task: "",
      start_date: new Date(),
      end_date: new Date(),
      priority: "",
      status: "",
      project_id: "",
      user_id: "",
      is_parent: false
    };
    this.projectManagementSvc.taskList = [];
  }  
  openProjectModal() {
    const modalRef = this.modalService.open(SearchProjectComponent);
  }

  refreshGrid(value, sort:string){
    if (this.sortdirection == sort) {
      if (sort.split(' ')[1] = 'asc') {
        sort = sort.split(' ')[0] + ' desc';
      }
    }
    this.sortdirection = sort;    
    this.projectManagementSvc.getTaskListForProject(value.project_id, sort).subscribe((res) => {      
      this.projectManagementSvc.taskList = res as Task[];
    });
  }
  onEndTask(id:string, project_id:string)
  {
    this.projectManagementSvc.deleteTask(id);
    this.refreshGrid({"project_id" :project_id },  "start_date asc");
  }
  onEditTask(id:string)
  { 
    this.projectManagementSvc.getTaskDetail(id).subscribe((res) => {               
      this.projectManagementSvc.selectedTask = res[0] as Task; 
      this.router.navigateByUrl('addTask');    
    });
        
  }
}
