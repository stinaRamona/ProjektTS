import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseList: Course[] = []; 
  onlySubjects: String [] = []; 

  constructor(private courseService: CourseService) {}

  ngOnInit(){
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.getSubjects(); 
    })
  }

  //För att inte kursämnet ska upprepa sig i select listan
  getSubjects(){
    const subjects = new Set(this.courseList.map(course => course.subject));
    this.onlySubjects = Array.from(subjects);
  }
}
