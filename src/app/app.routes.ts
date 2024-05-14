import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { RamschemaComponent } from './ramschema/ramschema.component';

export const routes: Routes = [
    { path: "courses", component: CoursesComponent}, 
    { path:"", redirectTo:"courses", pathMatch: 'full'}, 
    { path:"ramschema", component:RamschemaComponent}
];
