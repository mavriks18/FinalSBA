import { Component, OnInit } from '@angular/core';
import {ProjectManagementService} from 'src/app/shared/project-management.service' ;
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private projectManagementSvc : ProjectManagementService, private router : Router) { }

  ngOnInit() {
    this.projectManagementSvc.selectedTask = {
      _id :"",
      parent_id :"",
      task_id : "",
      task : "",
      start_date :"",
      end_date:"",
      priority: "",
      status :""
   }
 
  }
  onAddUserSubmit()
  {}
}
