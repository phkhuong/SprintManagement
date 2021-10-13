import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from './mock-server/fake.api.service';
import { TasksService } from './state/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpUtilsService } from './core/services/http-utils.service';
import { UsersService } from './state/users.service';
import { SchedulesService } from './state/schedules.table';
import { TaskEditComponent } from './pages/tasks/task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ThemeModule,
    BrowserAnimationsModule,
    PagesModule,
    NgbModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeApiService),
    HttpClientModule
  ],
  providers: [
    HttpUtilsService,
    TasksService,
    UsersService,
    SchedulesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
