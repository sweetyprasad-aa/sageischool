import { Component, OnInit } from '@angular/core';
import { Student } from '../../../interface/student';
import { MessageStudentService } from '../../../services/message-student.service'; 
import { StudentService } from '../../../services/student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  students: Array<Student> = [];
  // @ts-ignore 
  showStudent: Student; 
  isSelected: boolean = false;
  // @ts-ignore
  deletedStudent: Student;
  // @ts-ignore
  returnedMessage: string;
  constructor(private studentService: StudentService,
    private messageService: MessageStudentService) { }
  
    setStudentDetails(student: Student){
      this.isSelected=!this.isSelected;
      if(this.isSelected){
        this.showStudent = student;
      }else{
        // @ts-ignore
        this.showStudent = undefined;
      }
    }

    /**
   * Set deletedStudent and reset returnedMessage = undefined
   * @param deleteStudent
   */
  prepareDeleteStudent(deleteStudent: Student){
    //assign delete-Student
    this.deletedStudent = deleteStudent;
    // reset returned-Message
    // @ts-ignore
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Student by ID
   */
  deleteStudent(){    
    // @ts-ignore
    this.studentService.deleteStudent(this.deletedStudent.key)
              .then(() => {
                // remove a deletedStudent from students list on view
                this.students = this.students.filter(student => {
                  return student.key != this.deletedStudent.key;
                })

                // set a showing message in delete modal
                this.returnedMessage = "Delete Successfully a Student with key = " + this.deletedStudent.key;

                // just reset showStudent for not showing on view
                //@ts-ignore
                this.showStudent = undefined;

                // add the delete message to message app for showing
                this.messageService.add(this.returnedMessage);
              })
              .catch(error => {
                console.log(error);
                let errMsg: string = "Error! Details: " + error;
                this.messageService.add(errMsg);
              });
}

/**
   * Update Student function
   */
  updateStudent() {

    var updatedStudent = Object.assign({}, this.showStudent);
    delete updatedStudent.key;

    //@ts-ignore
    this.studentService.updateStudent(this.showStudent.key, updatedStudent)
                      .then(() => {
                          // update students list
                          this.students.map(x => {
                            if(x.key == this.showStudent.key){
                              x = this.showStudent;
                            }
                          });

                          let msg: string = "Update Successfully! -> New Student's properties: <br>"
                                            + "<ul>"
                                              + "<li>" + "id: " + this.showStudent.key + "</li>"
                                              + "<li>" + "fname: " + this.showStudent.fname + "</li>"
                                              + "<li>" + "lname: " + this.showStudent.lname + "</li>"
                                              + "<li>" + "password: " + this.showStudent.password + "</li>"
                                              + "<li>" + "loginId: " + this.showStudent.loginId + "</li>"
                                              + "<li>" + "class: " + this.showStudent.class + "</li>"
                                              + "<li>" + "phone: " + this.showStudent.phone + "</li>"
                                              + "<li>" + "userStatus: " + this.showStudent.userStatus + "</li>"
                                              + "<li>" + "createdTimestamp: " + this.showStudent.createdTimestamp + "</li>"
                                              + "<li>" + "modifiedTimestamp: " + this.showStudent.modifiedTimestamp + "</li>"
                                            + "</ul>";
                          this.messageService.add(msg);
                      })
                      .catch(error => {
                        console.log(error);
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  /**
   * Retrieve all Student from Backend
   */
  retrieveAllStudents() {
    this.studentService.getStudentsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(students => {
      //@ts-ignore
      this.students = students;
    }, (error) => {
      console.log(error);
    });           
  }


  ngOnInit(): void {
    this.retrieveAllStudents();
  }

}
