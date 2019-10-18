import { Component, OnInit } from '@angular/core';
import {ProjectManagementService} from 'src/app/shared/project-management.service' ;
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private projectManagementSvc : ProjectManagementService, private router : Router) { }

  ngOnInit() {
    this.projectManagementSvc.selectedUser = {
      _id :"",
      user_id:"",
      firstName:"",
      lastName:"",
      employee_id:"",
      project_id:"",
      task_id:""
    }
  }
  onAddUserSubmit(form :NgForm)
{
console.log('received ' + form.value.firstName + " " + form.value.lastName + " " + form.value.employee_id);
}
}
