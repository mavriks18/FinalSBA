import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchModalComponent } from './search-modal.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
describe('SearchModalComponent', () => {
  let component: SearchModalComponent;
  let fixture: ComponentFixture<SearchModalComponent>;
  const users = [{
    user_id: "1",
    firstName: "Test",
    lastName: "Test",
    employee_id: "1",
    project_id: "2",
    task_id: "1"
  }, {
    user_id: "2",
    firstName: "Test2",
    lastName: "Test2",
    employee_id: "2",
    project_id: "2",
    task_id: "1"
  }]
  const project = {
    project_id: "",
    project: "",
    priority: "",
    start_date: new Date(),
    end_date: new Date(),
    manager: "",
    status
  }
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
  const user = {
    firstName: "Unit Test User",
    lastName: "Unit Test Lname",
    employee_id: "142142"
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [SearchModalComponent],
      providers: [ProjectManagementService, NgbActiveModal],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchModalComponent);
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
  it('should refresh users', () => {
    const { sharedService, httpTestingController } = setup();
    sharedService.usersList = users;
    component.getUsers();
    expect(sharedService.usersList.length).toBeGreaterThan(0);
  });
  it('should save users', () => {
    const { sharedService, httpTestingController } = setup();
    sharedService.selectedProject = project
    sharedService.selectedTask = task;
    component.saveManager("1");
    expect(sharedService.selectedTask.user_id).toBe("1");
  });
  it('should close modal', ()=>{
    component.closeUsersModal();
    expect(component.isActive).toBe(false);
  })
});
