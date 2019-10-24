import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms'
import { AddProjectComponent } from './add-project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { DatePipe, CommonModule } from '@angular/common'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchModalComponent } from '../search-modal/search-modal.component'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let modalDialogWrapperServiceSpy: jasmine.SpyObj<NgbModal>;
  const mockModalDialogWrapperService = jasmine.createSpyObj('modalService', ['openModal']);
  mockModalDialogWrapperService.openModal();
  const projectList = [{
    project_id: "1",
    project: "Test",
    priority: "1",
    start_date: new Date(),
    end_date: new Date(),
    manager: "Test M",
    status : 'active'
  }, {
    project_id: "2",
    project: "Test2",
    priority: "2",
    start_date: new Date(),
    end_date: new Date(),
    manager: "Test M2",
    status : 'suspended'
  }]
  const project = {
    project_id: "1",
    project: "Test",
    priority: "1",
    start_date: new Date(),
    end_date: new Date(),
    manager: "Test M"
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule,NgbModule],
      declarations: [AddProjectComponent, SearchModalComponent],
      providers: [DatePipe, ProjectManagementService]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [SearchModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    modalDialogWrapperServiceSpy = TestBed.get(NgbModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  function setup() {
    const sharedService = TestBed.get(ProjectManagementService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { sharedService, httpTestingController };
  }
  it('should set priority', () => {
    const { sharedService, httpTestingController } = setup();
    component.setSliderValue(1);
    expect(sharedService.selectedProject.priority).toEqual(1);
  });


  it('should refresh grid',() => {    
    const { sharedService, httpTestingController } = setup();
    component.refreshProjectList('start_date');
    sharedService.projectList = projectList
    expect(sharedService.projectList.length).toBeGreaterThan(0);
  });
  it('shoudl suspend project', () => {    
    component.onSuspendProject('1');
    expect(component.updateSuccessful).toBe(true);
  });
  it('updateProject', ()=>{
    component.OnUpdateProject("1")
    expect(component._submitText).toBe("Update Project");
  });

  it('should open user modal', ()=>{    
    component.openModal();
    expect(mockModalDialogWrapperService.openModal).toHaveBeenCalledTimes(1);
  });

it('should add project' , ()=>{
  component.onAddProjectSubmit(project, true);
  expect(component.isLoadingAfterUpdate).toBe(true);
});
});
