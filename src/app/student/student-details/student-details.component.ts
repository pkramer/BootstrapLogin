import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../_interfaces/student.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentRepositoryService } from '../../shared/services/student-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

import { Account } from '../../_interfaces/account.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student;
  errorMessage: string = '';

  constructor(private repository: StudentRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getStudentDetails()
  }

  getStudentDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/student/${id}/account`;

    this.repository.getStudent(apiUrl)
    .subscribe({
      next: (own: Student) => this.student = own,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  printToConsole= (param: Account) => {
    console.log('Account parameter from the child component', param)
  }
}