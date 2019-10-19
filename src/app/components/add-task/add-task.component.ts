import { Component, OnInit } from '@angular/core';
import {ProjectManagementService} from 'src/app/shared/project-management.service' ;
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap'
import {SearchModalComponent} from '../search-modal/search-modal.component'
import {SearchTaskComponent} from '../search-task/search-task.component'
import {SearchProjectComponent} from '../search-project/search-project.component'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  closeResult: string;
  currentDate : Date = new Date();

  constructor(private projectManagementSvc : ProjectManagementService,
    private modalService: NgbModal, private router : Router) { }
  modalOptions:NgbModalOptions;
  chosenManager : string;
  ngOnInit() {
    this.projectManagementSvc.selectedTask = {
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
   }
 
  }
  setSliderValue(prior)
  {
    this.projectManagementSvc.selectedTask.priority = prior;
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

  openUserModal()
  {
    const modalRef = this.modalService.open(SearchModalComponent);    
  }

  openTaskModal()
  {
    const modalRef = this.modalService.open(SearchTaskComponent);  
  }

  onAddTaskSubmit(form :NgForm)
  {
console.log('Received : ' + form.value.start_date + form.value.end_date);
  }
  resetTaskForm(form? : NgForm)
  {
    if(form){
      form.reset();
      this.projectManagementSvc.selectedTask = {
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
     }
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  } 
}
