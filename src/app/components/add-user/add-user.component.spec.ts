import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { AddUserComponent } from './add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
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
  const user =  {    
    firstName: "Unit Test User",
    lastName: "Unit Test Lname",
    employee_id: "142142"    
  }
  const updateUser ={
    user_id: "2",
    firstName: "Test2",
    lastName: "Test2",
    employee_id: "2",
    project_id: "2",
    task_id: "1"
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule,HttpClientTestingModule],
      declarations: [AddUserComponent],
      providers: [ProjectManagementService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
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
  it('should refresh users', ()=>{
    const { sharedService, httpTestingController } = setup();    
     sharedService.usersList = users;
    component.refreshUserList('firstName asc');  
    expect(component.sortdirection).toBe('firstName desc');
  });
  it('should create user', ()=>{
    const { sharedService, httpTestingController } = setup();    
    component.onAddUserSubmit(user, true);
    expect(component.isLoadingAfterUpdate).toBe(true);
  });
  it('should update user', ()=>{
    const { sharedService, httpTestingController } = setup();    
    component.OnUpdateUser('2');
    sharedService.selectedUser = updateUser;
    expect(sharedService.selectedUser.user_id).toBe('2');
  });
  it('should delete user', ()=>{
    const { sharedService, httpTestingController } = setup();    
    component.OnDeleteUser('2');    
    expect(component.sortdirection).toContain("firstName");
  });
});
