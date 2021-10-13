import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ScheduleModel } from 'src/app/core/models/schedule.model';
import { SchedulesService } from 'src/app/state/schedules.table';
import {SchedulesEditDialogComponent} from '../schedules-edit/schedules-edit.dialog.component'

export interface PeriodicElement {
  creator: string;
  title: string;
  description: string;
  location: string;
  start_time: Date;
  end_time: Date;
}

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit, OnDestroy {
  schedules: ScheduleModel[];
  private subscriptions: Subscription[]= [];
  constructor(private scheduleService: SchedulesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  editSchedule(schedule: ScheduleModel):void {
    const dialogRef = this.dialog.open(
      SchedulesEditDialogComponent,
      {
        // minWidth: "400px",
        // width: "1000px",
        data: { schedule: schedule }
      });
      dialogRef.afterClosed().subscribe(res => {
        if(!res){
          return;
        }
        this.loadSchedules();
      })
  }

  deleteSchedule(schedule:ScheduleModel):void{
    const deleteSubscription = this.scheduleService.deleteSchedule(schedule.id).subscribe(res => {
      this.loadSchedules();
    });
    this.subscriptions.push(deleteSubscription);
  }

  loadSchedules(){
    const schedulesSubscription = this.scheduleService.getAllSchedules().subscribe(res => {
      this.schedules = res;
    })
    this.subscriptions.push(schedulesSubscription);
  }

  displayedColumns: string[] = ['title', 'creator', 'description', 'location', 'startTime', 'endTime', 'actions'];
}
