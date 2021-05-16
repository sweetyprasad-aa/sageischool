import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Teacher } from '../interface/teacher';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  main = "users"
  private dbPath = this.main+'/teachers';
  // @ts-ignore
  teachersRef: AngularFireList<Teacher> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.teachersRef = db.list(this.dbPath);
   }

   createTeacher(teacher: Teacher): void {
    this.teachersRef.push(teacher);
  }

  updateTeacher(key: string, value: any): Promise<void> {
    return this.teachersRef.update(key, value);
  }

  deleteTeacher(key: string): Promise<void> {
    return this.teachersRef.remove(key);
  }

  getTeachersList(): AngularFireList<Teacher> {
    return this.teachersRef;
  }

  deleteAll(): Promise<void> {
    return this.teachersRef.remove();
  }
}
