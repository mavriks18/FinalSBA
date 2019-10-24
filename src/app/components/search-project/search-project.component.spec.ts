import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProjectComponent } from './search-project.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
import { SafePropertyRead } from '@angular/compiler';
describe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;
  const project = {
    project_id: "",
    project: "",
    priority: "",
    start_date: new Date(),
    end_date: new Date(),
    manager: "",
    status: ""
  }
  const projects = [{
    project_id: "",
    project: "",
    priority: "",
    start_date: new Date(),
    end_date: new Date(),
    manager: "",
    status: ""
  },
  {
    project_id: "",
    project: "",
    priority: "",
    start_date: new Date(),
    end_date: new Date(),
    manager: "",
    status: ""
  }]
  const task = {
    parent_id: "",
    task_id: "",
    task: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: "",
    status: "",
    project_id: "",
    user_id: "",
    is_parent: false
  }
  const tasks = [{
    parent_id: "",
    task_id: "",
    task: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: "",
    status: "",
    project_id: "",
    user_id: "",
    is_parent: false
  },
  {
    parent_id: "",
    task_id: "",
    task: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: "",
    status: "",
    project_id: "",
    user_id: "",
    is_parent: false
  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [SearchProjectComponent],
      providers: [NgbActiveModal, ProjectManagementService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectComponent);
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

  it('should getProjects', () => {
    const { sharedService, httpTestingController } = setup();
    sharedService.projectList = projects;
    component.getProjects();
    expect(sharedService.projectList.length).toBeGreaterThan(0);
  });
  it('should saveProject' , ()=>{
    const { sharedService, httpTestingController } = setup();
    sharedService.selectedTask = task;
    sharedService.taskList = tasks;
    component.saveProject("1");
    expect(sharedService.selectedTask.project_id).toEqual("1");
  });
  it('should close modal' , ()=>{
    component.closeUsersModal();
    expect(component.isActive).toBe(false);
  });
});
