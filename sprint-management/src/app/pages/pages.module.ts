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
import { AppRoutingModule } from '../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
  
    UsersComponent,
       SchedulesListComponent,
       SchedulesEditDialogComponent,
       DashboardComponent,
       TaskEditComponent,
       LoginComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
