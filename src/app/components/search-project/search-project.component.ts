import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProjectManagementService} from 'src/app/shared/project-management.service'

import {Project} from 'src/app/shared/models/project.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {

  _projects : Project[];

  constructor(public activeModal: NgbActiveModal, 
    private projectMgmtService :ProjectManagementService ) { 

    }

  ngOnInit() {
    this.getProjects();
  }
  closeUsersModal()  {
    this.activeModal.close();        
  }

  getProjects(){
    this.projectMgmtService.getAllProjects('start_date').subscribe((res)=>{
      this.projectMgmtService.projectList = res as Project[];          
    });
  }
  saveProject(x)
  {
    
    this.projectMgmtService.selectedTask.project_id = x;
    this.activeModal.close();
    
  }
}
