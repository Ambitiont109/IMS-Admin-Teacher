import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student} from './student';
import { Observable, BehaviorSubject } from  'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api_url = environment.API_URL;
  public students: BehaviorSubject<Student[]>;

  constructor(private httpClient:HttpClient) {     
    this.students = new BehaviorSubject<Student[]>([]);

  }

  AddStudent(student:Student):Observable<Student>{
    return this.httpClient.post<Student>(`${this.api_url}/students/`, student).pipe(map(response=>{
      this._addStudent(response);
      return response;
    }));
  }

  UpdateStudent(student:Student):Observable<any> {
    return this.httpClient.put(`${this.api_url}/students/${student.id}/`, student).pipe(map(respone=>{
      this._updateStudent(respone as Student);
      return respone;
    }));
  }

  DeleteStudent(student:Student):Observable<any> {
    return this.httpClient.delete(`${this.api_url}/students/${student.id}/`).pipe(map(response=>{      
      this._deleteStudent(student);
      return response;
    }));
  }

  _addStudent(student:Student){
    this.students.next(this.students.value.concat(student));
  }
  _updateStudent(student:Student){
    let students= this.students.value;
    const index = students.findIndex((item:Student)=>{
      return item.id == student.id
    })
    students[index] = student;
    this.students.next(students);
  }

  _deleteStudent(student:Student){
    let students= this.students.value;
    const index = students.findIndex((item:Student)=>{
      return item.id == student.id
    })
    if(index !=-1){
      students.splice(index,1);        
    }
    this.students.next(students);
  }

  GetAllStudents():void{    

    this.httpClient.get<Student[]>(`${this.api_url}/students/`)
      .pipe(
        map(items=>{
          return items.map(item=>{
            return new Student(item);
          });     
        })
      ).subscribe(res=>{
        this.students.next(res);
      })
  } 
}
