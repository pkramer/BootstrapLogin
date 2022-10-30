import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

const routes: Routes = [
  { path: 'list', component: StudentListComponent },
  { path: 'details/:id', component: StudentDetailsComponent },
  { path: 'create', component: StudentCreateComponent },
  { path: 'update/:id', component: StudentUpdateComponent },
  { path: 'delete/:id', component: StudentDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }