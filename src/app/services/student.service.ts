import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Student } from '../interface/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  main = "users"
  private dbPath = this.main+'/students';
  // @ts-ignore
  studentsRef: AngularFireList<Student> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.studentsRef = db.list(this.dbPath);
   }

   createStudent(student: Student): void {
    this.studentsRef.push(student);
  }

  updateStudent(key: string, value: any): Promise<void> {
    return this.studentsRef.update(key, value);
  }

  deleteStudent(key: string): Promise<void> {
    return this.studentsRef.remove(key);
  }

  getStudentsList(): AngularFireList<Student> {
    return this.studentsRef;
  }

  deleteAll(): Promise<void> {
    return this.studentsRef.remove();
  }
}
