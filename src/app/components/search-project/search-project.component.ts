import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProjectManagementService} from 'src/app/shared/project-management.service'
import { from } from 'rxjs';
import {Project} from 'src/app/shared/models/project.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
