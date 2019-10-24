import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  FormsModule,NgForm } from '@angular/forms'
import { AddTaskComponent } from './add-task.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { SearchProjectComponent } from '../search-project/search-project.component'
import { SearchTaskComponent } from '../search-task/search-task.component'
import { SearchModalComponent } from '../search-modal/search-modal.component'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let modalDialogWrapperServiceSpy: jasmine.SpyObj<NgbModal>;
  const mockModalDialogWrapperService = jasmine.createSpyObj('modalService', ['openProjectModal','openUserModal','openTaskModal']);
  mockModalDialogWrapperService.openProjectModal();
  mockModalDialogWrapperService.openTaskModal();
  mockModalDialogWrapperService.openUserModal();
  const task ={
    parent_id: "1",
    task_id: "1",
    task: "Task",
    start_date: new Date(),
    end_date: new Date(),
    priority: "1",
    status: "active",
    project_id: "1",
    user_id: "1",
    is_parent: false
  }
  const parentTask ={
    parent_id: "",
    task_id: "1",
    task: "Task",
    start_date: new Date(),
    end_date: new Date(),
    priority: "1",
    status: "active",
    project_id: "1",
    user_id: "1",
    is_parent: true
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,HttpClientModule, HttpClientTestingModule, NgbModule ],  
      declarations: [AddTaskComponent,SearchProjectComponent,SearchTaskComponent,SearchModalComponent],
      providers :[DatePipe,ProjectManagementService, NgbModal]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [SearchProjectComponent,SearchTaskComponent,SearchModalComponent] } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    modalDialogWrapperServiceSpy = TestBed.get(NgbModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function setup() {
    const sharedService = TestBed.get(ProjectManagementService);      
    const httpTestingController = TestBed.get(HttpTestingController);
    return { sharedService, httpTestingController };
  }
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should refresh task', ()=>{
    const { sharedService, httpTestingController } = setup();
    component._taskid ='1'
     sharedService.selectedTask = task;
    component.refreshTask();    
    expect(sharedService.selectedTask.task_id).toBeGreaterThan(0);
  });
  it('should set priority', () => {
    const { sharedService, httpTestingController } = setup();
    component.setSliderValue(1);
    expect(sharedService.selectedTask.priority).toEqual(1);
  });
  it('should set checked value true', ()=>{
    component.onCheckedChange(true);
    expect(component.isparent).toBe(true);
  });
  it('should set checked value false', ()=>{
    component.onCheckedChange(false);
    expect(component.isparent).toBe(false);
  });
  it('should open project modal', ()=>{
    const { sharedService, httpTestingController } = setup();
    component.openProjectModal();
    expect(mockModalDialogWrapperService.openProjectModal).toHaveBeenCalledTimes(1);
  });
  it('should open task modal', ()=>{
    const { sharedService, httpTestingController } = setup();
    component.openTaskModal();
    expect(mockModalDialogWrapperService.openTaskModal).toHaveBeenCalledTimes(1);
  });
  it('should open user modal', ()=>{
    const { sharedService, httpTestingController } = setup();
    component.openUserModal();
    expect(mockModalDialogWrapperService.openUserModal).toHaveBeenCalledTimes(1);
  });
  it('should save task', ()=>{    
    component.onAddTaskSubmit(task, true);
    expect(component.isLoadingAfterUpdate).toBe(true);
  });
  it('should save parent', ()=>{
    component.isparent = true;    
    component.onAddTaskSubmit(task, true);
    expect(component.isLoadingAfterUpdate).toBe(true);
  });
});
