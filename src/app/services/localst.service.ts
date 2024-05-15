import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class LocalstService {

  private storageKey = 'courses';

  constructor() { }


  //för att lägga till kurs
  setItem(key: string, value:string): void {
    localStorage.setItem(key, value); 
  }

  //för att få ut kurslistan (kan vara null)
  getItem(key: string): string | null {
    return localStorage.getItem(key); 
  }

  //för för att ta bort en kurs 
  removeItem(courseCode:string): void {
    let savedCourses = this.getCourses();
    savedCourses = savedCourses.filter(course => course.courseCode !== courseCode);
    this.setItem(this.storageKey, JSON.stringify(savedCourses)); 
  }

  //för att radera hela kurslistan
  clear(): void {
    localStorage.clear(); 
  } 

  //lägga till en kurs i lista
  addCourse(course: Course): void {
    const savedCourses = this.getCourses();
    savedCourses.push(course);
    this.setItem(this.storageKey, JSON.stringify(savedCourses));
  }

  //Hämta alla sparade kurser med satt storageKey
  getCourses(): Course[] {
    const savedCourses = this.getItem(this.storageKey);
    return savedCourses ? JSON.parse(savedCourses) : [];
  }
}
