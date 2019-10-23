import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTaskComponent } from './search-task.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
describe('SearchTaskComponent', () => {
  let component: SearchTaskComponent;
  let fixture: ComponentFixture<SearchTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTaskComponent ],
      imports : [HttpClientModule],
      providers :[ProjectManagementService,NgbActiveModal],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
