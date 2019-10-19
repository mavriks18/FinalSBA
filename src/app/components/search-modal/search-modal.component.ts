import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProjectManagementService} from 'src/app/shared/project-management.service'
import {Users} from 'src/app/shared/models/users.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  // @Input() my_modal_title;
  // @Input() my_modal_content;
  _users : Users[];
  constructor(public activeModal: NgbActiveModal, 
    private projectMgmtService :ProjectManagementService ) { 
    this._users = [{
      _id:"1",
    user_id:"12",
    firstName    :"3",
    lastName :"4",
    employee_id:"5",
    project_id :"6",
    task_id:"7"
     }, {
      _id:"2",
    user_id:"2",
    firstName    :"3",
    lastName :"4",
    employee_id:"5",
    project_id :"6",
    task_id:"7"
     }];
  }

  ngOnInit() {
    this.getUsers();
  }
  closeUsersModal()  {
    this.activeModal.close();        
  }
getUsers()
{
  this.projectMgmtService.getAllUsers().subscribe((res)=>{
    this.projectMgmtService.usersList = res as Users[];          
  });
  this.projectMgmtService.usersList = this._users;
}
  saveManager(x)
  {
    
    this.projectMgmtService.selectedProject.manager = x;
    this.projectMgmtService.selectedTask.user_id = x;
    this.activeModal.close();
    
  }
}
