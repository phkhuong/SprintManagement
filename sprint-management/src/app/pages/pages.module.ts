import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SchedulesListComponent } from './schedules/schedules-list/schedules-list.component';
import { SchedulesEditComponent } from './schedules/schedules-edit/schedules-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';


@NgModule({
  declarations: [
  
    UsersComponent,
       SchedulesListComponent,
       SchedulesEditComponent,
       DashboardComponent,
       TaskEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
