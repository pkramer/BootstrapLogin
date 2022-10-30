import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { StudentRepositoryService } from '../../shared/services/student-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/_interfaces/student.model';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentForCreation } from 'src/app/_interfaces/studentForCreation.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  errorMessage: string = '';
  studentForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: StudentRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.studentForm.get(controlName).invalid && this.studentForm.get(controlName).touched)
      return true;
    
    return false;
  } 

  hasError = (controlName: string, errorName: string) => {
    if (this.studentForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createStudent = (studentFormValue) => {
    if (this.studentForm.valid)
      this.executeStudentCreation(studentFormValue);
  }

  private executeStudentCreation = (studentFormValue) => {
    const student: StudentForCreation = {
      name: studentFormValue.name,
      dateOfBirth: this.datePipe.transform(studentFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: studentFormValue.address
    }
    const apiUrl = 'api/student';
    this.repository.createStudent(apiUrl, student)
    .subscribe({
      next: (own: Student) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Student: ${own.name} created successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToStudentList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })

  }

redirectToStudentList = () => {
  this.router.navigate(['/student/list']);
}

}