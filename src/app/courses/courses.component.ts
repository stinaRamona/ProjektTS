import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseList: Course[] = []; 
  onlySubjects: String [] = []; 
  //för att filtrera kurser på ämne
  selectedSubject: String = ''; 
  subjectCourses: Course[] = [];
  //för att filtrera kurser på textfältet 
  filteredCourses: Course[] = []; 
  filterValue: String = ''; 

  constructor(private courseService: CourseService) {}

  ngOnInit(){
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.filteredCourses = data; 
      this.getSubjects(); 
      this.filterCourses()
    })
  } 


  //För att inte kursämnet ska upprepa sig i select listan
  getSubjects(){
    const subjects = new Set(this.courseList.map(course => course.subject));
    this.onlySubjects = Array.from(subjects);
  } 

  filterCourses(){
    this.filteredCourses = this.courseList.filter(course => {
      const matchesSubject = this.selectedSubject === '' || this.selectedSubject === 'Alla' || course.subject === this.selectedSubject;
      const matchesFilter = course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.filterValue.toLowerCase());
      return matchesSubject && matchesFilter;
    });
  }

  onSubjectChange(){
    this.filterCourses(); 
  } 

  onFilterChange(){
    this.filterCourses(); 
  }

  //Sortering av kurser baserat på namn i ämne, kurskod, namn och poäng
  sortCourseCode(){
    this.filteredCourses.sort((a, b) => (a.courseCode > b.courseCode) ? 1 : -1);
  }  

  sortCourseName(){
    this.filteredCourses.sort((a, b) =>(a.courseName > b.courseName) ? 1 : -1);
  }

  sortCoursePoints(){
    this.filteredCourses.sort((a, b) => (a.points > b.points) ? 1 : -1);
  } 

  sortCourseSubject(){
    this.filteredCourses.sort((a, b) => (a.subject > b.subject) ? 1 : -1);
  }
}
