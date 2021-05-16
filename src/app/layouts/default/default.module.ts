import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { TeachersComponent } from 'src/app/modules/teachers/teachers.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListTeacherComponent } from 'src/app/modules/teachers/list-teacher/list-teacher.component';
import { MessageComponent } from 'src/app/modules/teachers/message/message.component';
import { AddTeacherComponent } from 'src/app/modules/teachers/add-teacher/add-teacher.component';
import { ListStudentComponent } from 'src/app/modules/posts/list-student/list-student.component';
import { MessageStudentComponent } from 'src/app/modules/posts/message-student/message-student.component';
import { AddStudentComponent } from 'src/app/modules/posts/add-student/add-student.component';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    TeachersComponent,
    ListTeacherComponent,
    MessageComponent,
    AddTeacherComponent,
    ListStudentComponent,
    MessageStudentComponent,
    AddStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
  ]
})
export class DefaultModule { }