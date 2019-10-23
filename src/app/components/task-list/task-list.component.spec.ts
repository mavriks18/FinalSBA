import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ProjectManagementService } from 'src/app/shared/project-management.service';
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,HttpClientModule,RouterTestingModule],   
      declarations: [ TaskListComponent ],
      providers :[ProjectManagementService,NgbModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
