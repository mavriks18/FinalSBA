import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm } from '@angular/forms'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchModalComponent } from '../search-modal/search-modal.component'
import { Project } from 'src/app/shared/models/project.model'
import { DatePipe } from '@angular/common'



@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  modalOptions: NgbModalOptions;
  chosenManager: string;
  isLoadingAfterUpdate: boolean;
  updateSuccessful: boolean;
  constructor(
    private projectManagementSvc: ProjectManagementService,
    private modalService: NgbModal,
    private datepipe: DatePipe) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }
  currentDate: Date = new Date();
  closeResult: string;
  sortdirection: string;
  _submitText = "Add Project"
  ngOnInit() {
    this.resetToDefault();
    this.isLoadingAfterUpdate = false;
    this.updateSuccessful = false;
    this.refreshProjectList('start_date');

  }
  resetToDefault() {
    this.projectManagementSvc.selectedProject = {
      project_id: "",
      project: "",
      priority: "",
      start_date: new Date(),
      end_date: new Date(),
      manager: "",
      status
    }
  }

  onAddProjectSubmit(value, valid) {
    if (valid) {

      this.projectManagementSvc.postProjectDetail(value);
      this.resetToDefault();
      this.refreshProjectList('start_date');
      this.isLoadingAfterUpdate = true;
    }
  }
  setSliderValue(prior) {
    this.projectManagementSvc.selectedProject.priority = prior;
  }
  onSuspendProject(id: string) {
    this.projectManagementSvc.postSuspendProject(id)
    this.updateSuccessful = true;

  }

  openModal() {
    const modalRef = this.modalService.open(SearchModalComponent);
  }

  refreshProjectList(sortOption: string) {
    if (this.sortdirection == sortOption) {
      if (sortOption.split(' ')[1] = 'asc') {
        sortOption = sortOption.split(' ')[0] + ' desc';
      }
    }
    this.sortdirection = sortOption;
    this.projectManagementSvc.getAllProjects(sortOption).subscribe((res) => {
      this.projectManagementSvc.projectList = res as Project[];
    });
  }
  OnUpdateProject(id: string) {
    this.projectManagementSvc.getProjectDetail(id).subscribe((res) => {
      this.projectManagementSvc.selectedProject = res[0] as Project;

    });
    this._submitText = "Update Project";
    this.resetToDefault();

  }
}