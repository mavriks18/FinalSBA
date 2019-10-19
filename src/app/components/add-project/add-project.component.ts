import { Component, OnInit } from '@angular/core';
import {ProjectManagementService} from 'src/app/shared/project-management.service' ;
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { from } from 'rxjs';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap'
import {SearchModalComponent} from '../search-modal/search-modal.component'
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  modalOptions:NgbModalOptions;
  chosenManager : string;
  constructor(private projectManagementSvc : ProjectManagementService,
    private modalService: NgbModal, private router:Router) {this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    } }
  currentDate : Date = new Date();
  closeResult: string;
  ngOnInit() {
    this.projectManagementSvc.selectedProject ={
      _id:"",
      project_id : "",
      project :"",
      priority :"",
      start_date: new Date(),
      end_date : new Date(),
      manager :""
    }
    //this.currentDate.setDate(this.currentDate.getDate() +4)
    this.projectManagementSvc.selectedProject.end_date.setDate(this.currentDate.getDate() +1)
  }
  onAddProjectSubmit(form:NgForm)
  {

  }
  setSliderValue(prior)
  {
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
  resetProjectForm(form? : NgForm)
  {
    if(form){
      form.reset();
      this.projectManagementSvc.selectedProject ={
        _id:"",
        project_id : "",
        project :"",
        priority :"",
        start_date: new Date(),
        end_date : new Date(),
        manager :""
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
