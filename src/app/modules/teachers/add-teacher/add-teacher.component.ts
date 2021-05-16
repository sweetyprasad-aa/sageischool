import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../interface/teacher';
import { TeacherService } from '../../../services/teacher.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  
  // @ts-ignore
  teacher: Teacher;
  /**
   * Constructing Http Teacher Service
   * @param TeacherService 
   */
  constructor(private teacherService: TeacherService,
    private messageService: MessageService) { } 

  ngOnInit(): void {
    this.teacher = new Teacher();
  }
/**
   * Store a Teacher to backend server
   */
  save() {
    try{

      this.teacherService.createTeacher(this.teacher);
      let msg = "Success -> Post a Teacher: " 
                    + "<ul>"
                        + "<li>firstname: " + this.teacher.firstname + "</li>"
                        + "<li>lastname: " + this.teacher.lastname + "</li>"
                        + "<li>age: " + this.teacher.age + "</li>"
                        + "<li>address: " + this.teacher.address + "</li>"
                        + "<li>mobile: " + this.teacher.mobile + "</li>"
                        + "<li>department: " + this.teacher.department + "</li>"
                        + "<li>leacture1: " + this.teacher.leacture1 + "</li>"
                        + "<li>leacture2: " + this.teacher.leacture2 + "</li>"
                        + "<li>leacture3: " + this.teacher.leacture3 + "</li>"
                        + "<li>leacture4: " + this.teacher.leacture4 + "</li>"
                        + "<li>leacture5: " + this.teacher.leacture5 + "</li>"
                        + "<li>leacture6: " + this.teacher.leacture6 + "</li>"
                    + "</ul>";

      this.messageService.add(msg);
    } catch(err){
      console.error(err);
      let msg = "Error! -> Action Posting a Teacher:" 
                  + "<ul>"
                  + "<li>firstname: " + this.teacher.firstname + "</li>"
                  + "<li>lastname: " + this.teacher.lastname + "</li>"
                  + "<li>age: " + this.teacher.age + "</li>"
                  + "<li>address: " + this.teacher.address + "</li>"
                  + "<li>mobile: " + this.teacher.mobile + "</li>"
                  + "<li>department: " + this.teacher.department + "</li>"
                  + "<li>leacture1: " + this.teacher.leacture1 + "</li>"
                  + "<li>leacture2: " + this.teacher.leacture2 + "</li>"
                  + "<li>leacture3: " + this.teacher.leacture3 + "</li>"
                  + "<li>leacture4: " + this.teacher.leacture4 + "</li>"
                  + "<li>leacture5: " + this.teacher.leacture5 + "</li>"
                  + "<li>leacture6: " + this.teacher.leacture6 + "</li>"
                  + "</ul>";

      this.messageService.add(msg);
    }
  }

  reset(){
    this.teacher = new Teacher();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    this.save();
    this.reset();
  }
}
