import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/core/models/task.model';
import { TasksService } from 'src/app/state/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  newTasks: TaskModel[];
  inProcessTasks: TaskModel[];
  completedTasks: TaskModel[];
  private subscriptions: Subscription[] = [];
  
  constructor(private taskService:TasksService) { }

  ngOnInit(): void {
    const tasksSubscription = this.taskService.getAllTasks().subscribe(res =>{
      this.newTasks = res.filter(t => t.status == 'new');
      this.inProcessTasks = res.filter(t => t.status == 'inProgress');
      this.completedTasks = res.filter(t => t.status == 'done');
    })
    this.subscriptions.push(tasksSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
