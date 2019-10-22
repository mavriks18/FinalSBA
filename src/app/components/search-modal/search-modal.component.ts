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
    
  }

  ngOnInit() {
    this.getUsers();
  }
  closeUsersModal()  {
    this.activeModal.close();        
  }
getUsers()
{
  this.projectMgmtService.getAllUsers('firstName').subscribe((res)=>{
    this.projectMgmtService.usersList = res as Users[];          
  });
  
}
  saveManager(x)
  {
    
    this.projectMgmtService.selectedProject.manager = x;
    //this.projectMgmtService.selectedTask.user_id = x;
    this.activeModal.close();
    
  }
}
