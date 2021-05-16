import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../interface/teacher';
import { MessageService } from '../../../services/message.service';
import { TeacherService } from '../../../services/teacher.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  teachers: Array<Teacher> = [];
  // @ts-ignore
  showTeacher: Teacher; 
  isSelected: boolean = false;
  // @ts-ignore
  deletedTeacher: Teacher;
  // @ts-ignore
  returnedMessage: string;
  constructor(private teacherService: TeacherService,
    private messageService: MessageService) { }
  
    setTeacherDetails(teacher: Teacher){
      this.isSelected=!this.isSelected;
      if(this.isSelected){
        this.showTeacher = teacher;
      }else{
        // @ts-ignore
        this.showTeacher = undefined;
      }
    }

    /**
   * Set deletedTeacher and reset returnedMessage = undefined
   * @param deleteTeacher
   */
  prepareDeleteTeacher(deleteTeacher: Teacher){
    //assign delete-Teacher
    this.deletedTeacher = deleteTeacher;
    // reset returned-Message
    // @ts-ignore
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Teacher by ID
   */
  deleteTeacher(){    
    // @ts-ignore
    this.teacherService.deleteTeacher(this.deletedTeacher.key)
              .then(() => {
                // remove a deletedTeacher from teachers list on view
                this.teachers = this.teachers.filter(teacher => {
                  return teacher.key != this.deletedTeacher.key;
                })

                // set a showing message in delete modal
                this.returnedMessage = "Delete Successfully a Teacher with key = " + this.deletedTeacher.key;

                // just reset showTeacher for not showing on view
                //@ts-ignore
                this.showTeacher = undefined;

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
   * Update Teacher function
   */
  updateTeacher() {

    var updatedTeacher = Object.assign({}, this.showTeacher);
    delete updatedTeacher.key;

    //@ts-ignore
    this.teacherService.updateTeacher(this.showTeacher.key, updatedTeacher)
                      .then(() => {
                          // update teachers list
                          this.teachers.map(x => {
                            if(x.key == this.showTeacher.key){
                              x = this.showTeacher;
                            }
                          });

                          let msg: string = "Update Successfully! -> New Teacher's properties: <br>"
                                            + "<ul>"
                                              + "<li>" + "id: " + this.showTeacher.key + "</li>"
                                              + "<li>" + "firstname: " + this.showTeacher.firstname + "</li>"
                                              + "<li>" + "lastname: " + this.showTeacher.lastname + "</li>"
                                              + "<li>" + "age: " + this.showTeacher.age + "</li>"
                                              + "<li>" + "address: " + this.showTeacher.address + "</li>"
                                              + "<li>" + "mobile: " + this.showTeacher.mobile + "</li>"
                                              + "<li>" + "department: " + this.showTeacher.department + "</li>"
                                              + "<li>" + "leacture1: " + this.showTeacher.leacture1 + "</li>"
                                              + "<li>" + "leacture2: " + this.showTeacher.leacture2 + "</li>"
                                              + "<li>" + "leacture3: " + this.showTeacher.leacture3 + "</li>"
                                              + "<li>" + "leacture4: " + this.showTeacher.leacture4 + "</li>"
                                              + "<li>" + "leacture5: " + this.showTeacher.leacture5 + "</li>"
                                              + "<li>" + "leacture6: " + this.showTeacher.leacture6 + "</li>"
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
   * Retrieve all Teacher from Backend
   */
  retrieveAllTeachers() {
    this.teacherService.getTeachersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(teachers => {
      //@ts-ignore
      this.teachers = teachers;
    }, (error) => {
      console.log(error);
    });           
  }


  ngOnInit(): void {
    this.retrieveAllTeachers();
  }

}
