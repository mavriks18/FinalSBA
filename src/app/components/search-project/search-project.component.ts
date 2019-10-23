import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProjectManagementService} from 'src/app/shared/project-management.service'

import {Project} from 'src/app/shared/models/project.model'
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {

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
    if(this.projectMgmtService.selectedTask != null)
    {
      this.projectMgmtService.selectedTask.project_id = x;
      this.projectMgmtService.getTaskListForProject(x, 'start_date asc').subscribe((res)=>{
        this.projectMgmtService.taskList = res as Task[];          
     });
    }
    this.activeModal.close();
    
  }
}
