import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { StudentRepositoryService } from '../../shared/services/student-repository.service';
import { Student } from '../../_interfaces/student.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {
  student: Student;
  bsModalRef?: BsModalRef;

  constructor(private repository: StudentRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

  ngOnInit(): void {
    this.getStudentById();
  }

  private getStudentById = () => {
    const studentId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/student/${studentId}`;

    this.repository.getStudent(apiUri)
    .subscribe({
      next: (own: Student) => this.student = own,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  deleteStudent = () => {
    const deleteUri: string = `api/student/${this.student.id}`;

    this.repository.deleteStudent(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Student deleted successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToStudentList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToStudentList = () => {
    this.router.navigate(['/student/list']);
  }

}