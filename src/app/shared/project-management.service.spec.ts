import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from './project-management.service';

describe('ProjectManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
      providers: [ProjectManagementService]
  }));

  it('should be created', () => {
    const service: ProjectManagementService = TestBed.get(ProjectManagementService);
    expect(service).toBeTruthy();
  });
});
