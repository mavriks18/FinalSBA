import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm , FormsModule} from '@angular/forms'
import { Router } from '@angular/router'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchModalComponent } from '../search-modal/search-modal.component'
import { SearchTaskComponent } from '../search-task/search-task.component'
import { SearchProjectComponent } from '../search-project/search-project.component'
import { DatePipe } from '@angular/common'
import { Task } from 'src/app/shared/models/task.model'
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],  
})

export class AddTaskComponent implements OnInit {
  isLoadingAfterUpdate: boolean;
  closeResult: string;
  currentDate: Date = new Date();
  isparent: boolean;
  isupdateRoute: boolean;
  commandtext: string;
  constructor(private projectManagementSvc: ProjectManagementService,
    private modalService: NgbModal, private datepipe: DatePipe) { }
  modalOptions: NgbModalOptions;
  chosenManager: string;
  _taskid: string;
  ngOnInit() {
    this.commandtext = "Add Task";
    if (this.projectManagementSvc.selectedTask != null) {
      this._taskid = this.projectManagementSvc.selectedTask.task_id;
    }
    this.resetToDefault();
    this.refreshTask();
    this.isLoadingAfterUpdate = false;
  }
  refreshTask() {
    if (this._taskid != null && this._taskid != '') {
      this.isupdateRoute = true;
      this.commandtext = "Update Task";
      this.projectManagementSvc.getTaskDetail(this._taskid).subscribe((res) => {
        this.projectManagementSvc.selectedTask = res[0] as Task;        
      });
    }
  }
  setSliderValue(prior) {
    this.projectManagementSvc.selectedTask.priority = prior;
  }
  resetToDefault()
  {
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
    }
  }
  openProjectModal() {
    const modalRef = this.modalService.open(SearchProjectComponent);
  }

  openUserModal() {
    const modalRef = this.modalService.open(SearchModalComponent);
  }

  openTaskModal() {
    const modalRef = this.modalService.open(SearchTaskComponent);
  }

  onAddTaskSubmit(value, valid) {    
    if (valid) {
      if (this.isparent) {
        this.projectManagementSvc.postParentTaskDetail(value);
        this.isparent = false;
      }
      else {

        this.projectManagementSvc.postTaskDetail(value);
        this.isupdateRoute = false;
      }
      this.isLoadingAfterUpdate = true; 
      this.resetToDefault();     
    }
  }


  onCheckedChange(checked: boolean) {
    this.isparent = checked;
  }

}
