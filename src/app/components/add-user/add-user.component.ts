import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Users } from 'src/app/shared/models/users.model'
import { format } from 'url';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

  constructor(private projectManagementSvc: ProjectManagementService) { }
  _submitText = "Add";
  isLoadingAfterUpdate: boolean;
  sortdirection: string;
  ngOnInit() {
    this.resetToDefault();
    this.refreshUserList('firstName asc');
    this.isLoadingAfterUpdate = false;
  }
  resetToDefault() {
    this.projectManagementSvc.selectedUser = {
      user_id: "",
      firstName: "",
      lastName: "",
      employee_id: "",
      project_id: "",
      task_id: ""
    }
  }
  onAddUserSubmit(value, valid) {
    if (valid) {      
      this.projectManagementSvc.postUserDetail(value);
      this.sortdirection = "";
      this.refreshUserList('firstName asc');
      this._submitText = "Add";
      this.resetToDefault()
      this.isLoadingAfterUpdate = true;
    }
  }
  OnUpdateUser(id: string) {
    this._submitText = "Update";
    this.projectManagementSvc.getUserDetail(id).subscribe((res) => {
      this.projectManagementSvc.selectedUser = res[0] as Users;
    });

  }
  OnDeleteUser(id: string) {
    this.projectManagementSvc.deleteUser(id);
    this.resetToDefault();
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
