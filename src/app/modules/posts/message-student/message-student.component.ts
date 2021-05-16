import { Component, OnInit } from '@angular/core';
import {MessageStudentService} from '../../../services/message-student.service';

@Component({
  selector: 'app-message-student',
  templateUrl: './message-student.component.html',
  styleUrls: ['./message-student.component.scss']
})
export class MessageStudentComponent implements OnInit {

  constructor(public messageStudentService: MessageStudentService) { }

  ngOnInit(): void {
  }

}
