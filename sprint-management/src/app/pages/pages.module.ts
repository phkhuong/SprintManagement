import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SchedulesListComponent } from './schedules/schedules-list/schedules-list.component';
import { SchedulesEditDialogComponent } from './schedules/schedules-edit/schedules-edit.dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
  
    UsersComponent,
       SchedulesListComponent,
       SchedulesEditDialogComponent,
       DashboardComponent,
       TaskEditComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class PagesModule { }
