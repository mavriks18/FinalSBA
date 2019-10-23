import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Users } from 'src/app/shared/models/users.model'
import { format } from 'url';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private projectManagementSvc: ProjectManagementService) { }
  _submitText = "Add";
  isLoadingAfterUpdate : boolean;
  sortdirection: string;
  ngOnInit() {
    this.projectManagementSvc.selectedUser = {
      user_id: "",
      firstName: "",
      lastName: "",
      employee_id: "",
      project_id: "",
      task_id: ""
    }
    this.refreshUserList('firstName asc');
    this.isLoadingAfterUpdate = false;
  }
  onAddUserSubmit(form: NgForm) {
    
    if (form.valid) {
    
      this.projectManagementSvc.postUserDetail(form.value);
      form.reset();
      this.sortdirection = "";
      this.refreshUserList('firstName asc');
      this._submitText = "Add";
      this.isLoadingAfterUpdate = true;
    }
  }
  OnUpdateUser(id: string, form: NgForm) {
    this._submitText = "Update";
    this.projectManagementSvc.getUserDetail(id).subscribe((res) => {
      this.projectManagementSvc.selectedUser = res[0] as Users;
    });

  }
  OnDeleteUser(id: string, form: NgForm) {
    this.projectManagementSvc.deleteUser(id);
    form.reset();
    this.sortdirection = "";
    this.refreshUserList('firstName asc');
  }  
  refreshUserList(sort: string) {
    if (this.sortdirection == sort) {
      if (sort.split(' ')[1] = 'asc') {
        sort = sort.split(' ')[0] + ' desc';
      }
    }
    this.sortdirection = sort;
    this.projectManagementSvc.getAllUsers(sort).subscribe((res) => {
      this.projectManagementSvc.usersList = res as Users[];
    });
  }
}
