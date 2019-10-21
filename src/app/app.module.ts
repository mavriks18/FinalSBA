import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { SearchProjectComponent } from './components/search-project/search-project.component';
import { SearchTaskComponent } from './components/search-task/search-task.component'
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    TaskListComponent,
    SearchModalComponent,
    SearchProjectComponent,
    SearchTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  entryComponents : [SearchModalComponent,SearchProjectComponent,
    SearchTaskComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
