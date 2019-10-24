import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchProjectComponent } from '../search-project/search-project.component'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { DatePipe } from '@angular/common'
import { ProjectManagementService } from 'src/app/shared/project-management.service';
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let modalDialogWrapperServiceSpy: jasmine.SpyObj<NgbModal>;
  const mockModalDialogWrapperService = jasmine.createSpyObj('modalService', ['openProjectModal']);
  mockModalDialogWrapperService.openProjectModal();
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
  const tasks =[{
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
  },{
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
  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,HttpClientModule,RouterTestingModule,NgbModule,HttpClientTestingModule],   
      declarations: [ TaskListComponent,SearchProjectComponent ],
      providers :[DatePipe,ProjectManagementService,NgbModal]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [SearchProjectComponent] } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    modalDialogWrapperServiceSpy = TestBed.get(NgbModal);
    component = fixture.componentInstance;
    component.isparent = false;
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
  it('should open project modal', ()=>{
    const { sharedService, httpTestingController } = setup();
    component.openProjectModal();
    expect(mockModalDialogWrapperService.openProjectModal).toHaveBeenCalledTimes(1);
  });
  it('should refresh', ()=>{
    const { sharedService, httpTestingController } = setup();
    component.sortdirection ="start_date asc";
    component.refreshGrid(task, "start_date asc");
    sharedService.taskList = tasks;
    expect(sharedService.taskList.length).toBeGreaterThan(0);
  });
it('should edit task' , ()=>{
  component.onEditTask("1");
  expect(component.isparent).toBe(false);
});

it('should End task' , ()=>{
  component.onEndTask("1", "34");
  expect(component.isparent).toBe(false);
});
});
