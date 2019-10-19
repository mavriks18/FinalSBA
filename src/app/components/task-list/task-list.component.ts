import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchProjectComponent } from '../search-project/search-project.component'
import {Task} from 'src/app/shared/models/task.model'
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  modalOptions: NgbModalOptions;
  chosenManager: string;
  closeResult: string;
  _tasks :  Task[];  
  constructor(private projectManagementSvc: ProjectManagementService,
    private modalService: NgbModal, private router: Router) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    this._tasks = [{
      _id :"",
      parent_id :"",
      task_id : "",
      task : "",
      start_date : new Date(),
      end_date: new Date(),
      priority: "",
      status :"",
      project_id :"",
      user_id :""
   }];
   this.projectManagementSvc.selectedProject ={
    _id:"",
    project_id : "",
    project :"",
    priority :"",
    start_date: new Date(),
    end_date : new Date(),
    manager :""
  };
  }
  onTaskListSubmit(form: NgForm) {

  }

  getTaskListForProject(id:string)
  {
    this.projectManagementSvc.getTaskListForProject(id).subscribe((res)=>{
     this._tasks = res as Task[];
    });
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  openProjectModal() {
    const modalRef = this.modalService.open(SearchProjectComponent);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
