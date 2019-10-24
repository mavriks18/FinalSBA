import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTaskComponent } from './search-task.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
describe('SearchTaskComponent', () => {
  let component: SearchTaskComponent;
  let fixture: ComponentFixture<SearchTaskComponent>;
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
    is_parent: true 
  },{
    parent_id: "",
    task_id: "",
    task: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: "",
    status: "",
    project_id: "",
    user_id: "",
    is_parent: true
  }]
  const task ={
    parent_id: "",
    task_id: "",
    task: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: "",
    status: "",
    project_id: "",
    user_id: "",
    is_parent: true
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTaskComponent ],
      imports : [HttpClientModule,HttpClientTestingModule],
      providers :[ProjectManagementService,NgbActiveModal],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTaskComponent);
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
  it('should getTasks', () => {
    const { sharedService, httpTestingController } = setup();
    sharedService.parentTasks = tasks;
    component.getTasks();
    expect(sharedService.parentTasks.length).toBeGreaterThan(0);
  });
  it('should closeUsersModal', () => {
    component.closeUsersModal();
    expect(component.isActive).toBe(false);
  });
  it('should saveTask', () => {
    const { sharedService, httpTestingController } = setup();
    sharedService.selectedTask = task;
    component.saveTask("1");
    expect(sharedService.selectedTask.parent_id).toBe("1");
  });
});
