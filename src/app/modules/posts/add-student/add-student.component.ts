import { Component, OnInit } from '@angular/core';
import { Student } from '../../../interface/student';
import { StudentService } from '../../../services/student.service';
import { MessageStudentService } from '../../../services/message-student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  
  // @ts-ignore
  student: Student;
  /**
   * Constructing Http Student Service
   * @param StudentService
   */
  constructor(private studentService: StudentService,
    private messageService: MessageStudentService) { } 

  ngOnInit(): void {
    this.student = new Student(); 
  }
/**
   * Store a Student to backend server
   */
  save() {
    try{

      this.studentService.createStudent(this.student);
      let msg = "Success -> Post a Student: " 
                    + "<ul>"
                        + "<li>fname: " + this.student.fname + "</li>"
                        + "<li>lname: " + this.student.lname + "</li>"
                        + "<li>password: " + this.student.password + "</li>"
                        + "<li>loginId: " + this.student.loginId + "</li>"
                        + "<li>class: " + this.student.class + "</li>"
                        + "<li>phone: " + this.student.phone + "</li>"
                        + "<li>userStatus: " + this.student.userStatus + "</li>"
                        + "<li>createdTimestamp: " + this.student.createdTimestamp + "</li>"
                        + "<li>modifiedTimestamp: " + this.student.modifiedTimestamp + "</li>"
                    + "</ul>";

      this.messageService.add(msg);
    } catch(err){
      console.error(err);
      let msg = "Error! -> Action Posting a Student:" 
                  + "<ul>"
                  + "<li>fname: " + this.student.fname + "</li>"
                        + "<li>lname: " + this.student.lname + "</li>"
                        + "<li>password: " + this.student.password + "</li>"
                        + "<li>loginId: " + this.student.loginId + "</li>"
                        + "<li>class: " + this.student.class + "</li>"
                        + "<li>phone: " + this.student.phone + "</li>"
                        + "<li>userStatus: " + this.student.userStatus + "</li>"
                        + "<li>createdTimestamp: " + this.student.createdTimestamp + "</li>"
                        + "<li>modifiedTimestamp: " + this.student.modifiedTimestamp + "</li>"
                  + "</ul>";

      this.messageService.add(msg);
    }
  }

  reset(){
    this.student = new Student();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    this.save();
    this.reset();
  }
}
