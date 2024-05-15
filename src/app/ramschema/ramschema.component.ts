import { Component } from '@angular/core';
import { LocalstService } from '../services/localst.service';
import { CommonModule } from '@angular/common';
import { Course } from '../model/course';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ramschema.component.html',
  styleUrl: './ramschema.component.css'
})
export class RamschemaComponent { 
  //initierar tom array
  courseList: Course[] = []; 

  constructor(private localstService: LocalstService) {}

  ngOnInit() {
    this.loadCourses(); 
  } 

  loadCourses(){
    //hämtar kurslista från LS
    this.courseList = this.localstService.getCourses()
  }

  removeCourse(course: Course): void{
    this.localstService.removeItem(course.courseCode);
    //hämtar kurslistan på nytt
    this.loadCourses(); 
  }


}
