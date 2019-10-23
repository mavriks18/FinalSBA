import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProjectComponent } from './search-project.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from 'src/app/shared/project-management.service'
describe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      declarations: [ SearchProjectComponent ],
      providers :[NgbActiveModal,ProjectManagementService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
