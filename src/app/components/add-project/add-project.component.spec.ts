import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms'
import { AddProjectComponent } from './add-project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from 'src/app/shared/project-management.service';
import { DatePipe } from '@angular/common'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from 'src/app/shared/models/project.model';
import { timer } from 'rxjs';
import { isRegExp } from 'util';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,HttpClientModule,HttpClientTestingModule],        
      declarations: [ AddProjectComponent],
      providers :[DatePipe,ProjectManagementService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  function setup() {
    const sharedService = TestBed.get(ProjectManagementService);    
    const httpTestingController = TestBed.get(HttpTestingController);
    return { sharedService,httpTestingController };
  }
  it('should set priority', ()=>{
    const { sharedService,httpTestingController } = setup();
    component.setSliderValue(1);    
    expect(sharedService.selectedProject.priority).toEqual(1);
  });
  

  it('should refresh grid', fakeAsync(() => {
    const start = performance.now();
    const { sharedService,httpTestingController } = setup();    
      component.refreshProjectList('start_date');  
      setTimeout(() => {
        sharedService.projectList = [{
          project_id: "",
          project: "",
          priority: "",
          start_date: new Date(),
          end_date: new Date(),
          manager: ""
        }]
    }, 5000);    
    tick(5000);        
    expect(sharedService.projectList.length).toBeGreaterThan(0);    
}));


});
