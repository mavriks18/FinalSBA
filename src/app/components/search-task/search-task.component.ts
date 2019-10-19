import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProjectManagementService} from 'src/app/shared/project-management.service'
import {Task} from 'src/app/shared/models/task.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {
_tasks : Task[];
  constructor(public activeModal: NgbActiveModal, 
    private projectMgmtService :ProjectManagementService) { 

    }

  ngOnInit() {
  }
  
  closeUsersModal()  {
    this.activeModal.close();        
  }   

getTasks()
{
  this.projectMgmtService.getAllTasks().subscribe((res)=>{
    this.projectMgmtService.taskList = res as Task[];          
  }); 
  
}
saveTask(x)
  {
    
    this.projectMgmtService.selectedTask.parent_id = x;
    this.activeModal.close();
    
  }
}
