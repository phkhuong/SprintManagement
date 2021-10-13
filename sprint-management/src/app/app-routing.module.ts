import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchedulesListComponent } from './pages/schedules/schedules-list/schedules-list.component';
import { TaskEditComponent } from './pages/tasks/task-edit/task-edit.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "schedules", component: SchedulesListComponent},
  {path: "users", component: UsersComponent},
  {path: "login", component: LoginComponent},
  {path: "task", children: [
    {path: "", component: TaskEditComponent},
    {path: ":id", component: TaskEditComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
