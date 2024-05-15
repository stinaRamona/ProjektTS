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
  //initierar tom array för kurslistan
  courseList: Course[] = []; 
  //variabel för att spara summan av poängen i
  sumOfPoints: number = 0; 

  constructor(private localstService: LocalstService) {}

  ngOnInit() {
    this.loadCourses();  
  } 

  loadCourses(){
    //hämtar kurslista från LS
    this.courseList = this.localstService.getCourses(); 
    this.calculatePoints(); 
  }

  removeCourse(course: Course): void{
    this.localstService.removeItem(course.courseCode);
    //hämtar kurslistan på nytt
    this.loadCourses(); 
  }

  calculatePoints() {
    //lägger ihop summana v alla kurspoängen
    this.sumOfPoints = this.courseList.reduce((sum, course) => sum + course.points, 0)
  }


}
