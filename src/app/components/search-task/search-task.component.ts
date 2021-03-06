import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
import { Task } from 'src/app/shared/models/task.model'
import { FormsModule } from '@angular/forms';
import { ParentTask } from 'src/app/shared/models/parent-task.model';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {
  _tasks: Task[];
  isActive :boolean;
  constructor(public activeModal: NgbActiveModal,
    private projectMgmtService: ProjectManagementService) {

  }

  ngOnInit() {
    this.getTasks();
  }

  closeUsersModal() {
    this.activeModal.close();
    this.isActive = false;
  }

  getTasks() {
    if (this.projectMgmtService.selectedTask != null) {
      this.projectMgmtService.getAllParentTasksForProject(this.projectMgmtService.selectedTask.project_id).subscribe((res) => {
        this.projectMgmtService.parentTasks = res as ParentTask[];
      });
    }
  }
  saveTask(x) {

    this.projectMgmtService.selectedTask.parent_id = x;
    this.activeModal.close();

  }
}
