import { StudentForUpdate } from '../../_interfaces/studentForUpdate.model';
import { StudentForCreation } from '../../_interfaces/studentForCreation.model';
import { Student } from '../../_interfaces/student.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getStudents = (route: string) => {
    return this.http.get<Student[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public getStudent = (route: string) => {
    return this.http.get<Student>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public createStudent = (route: string, student: StudentForCreation) => {
    return this.http.post<Student>(this.createCompleteRoute(route, this.envUrl.urlAddress), student, this.generateHeaders());
  }

  public updateStudent = (route: string, student: StudentForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), student, this.generateHeaders());
  }

  public deleteStudent = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}