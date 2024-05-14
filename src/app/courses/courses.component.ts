import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseList: Course[] = []; 
  onlySubjects: String [] = []; 
  selectedSubject: String = ''; 
  subjectCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(){
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.getSubjects(); 
      this.filterBySubject()
    })
  }

  //För att inte kursämnet ska upprepa sig i select listan
  getSubjects(){
    const subjects = new Set(this.courseList.map(course => course.subject));
    this.onlySubjects = Array.from(subjects);
  }

  //För att visa kurser utvalda av ämne 
  filterBySubject() {
    if (this.selectedSubject === ''){
      this.subjectCourses = this.courseList
    } else {
      this.subjectCourses = this.courseList.filter(course => course.subject === this.selectedSubject);
      
    }
  }

  onSubjectChange(){
    this.filterBySubject(); 
  }
}
