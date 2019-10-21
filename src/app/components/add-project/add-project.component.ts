import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchModalComponent } from '../search-modal/search-modal.component'
import { Project } from 'src/app/shared/models/project.model'
import { format } from 'url';
import { async } from '@angular/core/testing';
import {DatePipe} from '@angular/common'
import { DatepickerViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  modalOptions: NgbModalOptions;
  chosenManager: string;
  
  constructor(private projectManagementSvc: ProjectManagementService,
    private modalService: NgbModal, private router: Router, private datepipe: DatePipe) {
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
    this.projectManagementSvc.selectedProject = {
      project_id: "",
      project: "",
      priority: "",
      start_date: new Date(),
      end_date: new Date(),
      manager: ""
    }
    
    
    this.refreshProjectList('start_date');

  }

  onAddProjectSubmit(form: NgForm) {    
    this.projectManagementSvc.postProjectDetail(form.value);    
    form.reset();
    this.refreshProjectList('start_date');   
  }
  setSliderValue(prior) {
    this.projectManagementSvc.selectedProject.priority = prior;
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  openModal() {
    const modalRef = this.modalService.open(SearchModalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }
  resetProjectForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.projectManagementSvc.selectedProject = {

        project_id: "",
        project: "",
        priority: "",
        start_date: new Date(),
        end_date: new Date(),
        manager: ""
      }
    }
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

   OnUpdateProject(id: string, form : NgForm)
   {
        this.projectManagementSvc.getProjectDetail(id).subscribe((res) => {               
          //this._project = res as Project;
          this.projectManagementSvc.selectedProject = res[0] as Project;            
            form.setValue({
              project_id : this.projectManagementSvc.selectedProject.project_id,
            project: this.projectManagementSvc.selectedProject.project,
            priority: this.projectManagementSvc.selectedProject.priority,
            start_date: this.datepipe.transform(this.projectManagementSvc.selectedProject.start_date, 'yyyy-MM-dd'),
            end_date: this.datepipe.transform(this.projectManagementSvc.selectedProject.end_date, 'yyyy-MM-dd'),
            manager: this.projectManagementSvc.selectedProject.manager});
          });
          this._submitText = "Update Project";
         form.reset();

   }
  }