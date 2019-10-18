import { Component, OnInit } from '@angular/core';
import {ProjectManagementService} from 'src/app/shared/project-management.service' ;
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private projectManagementSvc : ProjectManagementService, private router:Router) { }
  currentDate : Date = new Date();
  
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
    this.currentDate.setDate(this.currentDate.getDate() +4)
    this.projectManagementSvc.selectedProject.end_date.setDate(this.currentDate.getDate() +1)
  }
  setSliderValue(prior)
  {
    this.projectManagementSvc.selectedProject.priority = prior;
  }



}
