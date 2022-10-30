import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../_interfaces/student.model';
import { StudentRepositoryService } from '../../shared/services/student-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[];
  errorMessage: string = '';

  constructor(private repository: StudentRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  private getAllStudents = () => {
    const apiAddress: string = 'api/students';
    this.repository.getStudents(apiAddress)
    .subscribe({
      next: (own: Student[]) => this.students = own,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public getStudentDetails = (id) => { 
    const detailsUrl: string = `/student/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/student/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/student/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}