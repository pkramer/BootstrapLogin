import { Component, OnInit } from '@angular/core';
import { StudentForUpdate } from '../../_interfaces/studentForUpdate.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../_interfaces/student.model';
import { StudentRepositoryService } from 'src/app/shared/services/student-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: StudentRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getStudentById();
  }

  private getStudentById = () => {
    const studentId: string = this.activeRoute.snapshot.params['id'];
    const studentByIdUri: string = `api/student/${studentId}`;

    this.repository.getStudent(studentByIdUri)
    .subscribe({
      next: (own: Student) => {
        this.student = { ...own, 
          dateOfBirth: new Date(this.datePipe.transform(own.dateOfBirth, 'MM/dd/yyyy'))
        };
        this.studentForm.patchValue(this.student);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
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

  public updateStudent = (studentFormValue) => {
    if (this.studentForm.valid)
      this.executeStudentUpdate(studentFormValue);
  }

  private executeStudentUpdate = (studentFormValue) => {
    const studentForUpd: StudentForUpdate = {
      name: studentFormValue.name,
      dateOfBirth: this.datePipe.transform(studentFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: studentFormValue.address
    }

    const apiUri: string = `api/student/${this.student.id}`;

    this.repository.updateStudent(apiUri, studentForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Student updated successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToStudentList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToStudentList = () => {
    this.router.navigate(['/student/list']);
  }

}