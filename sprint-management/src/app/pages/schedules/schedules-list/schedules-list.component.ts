import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScheduleModel } from 'src/app/core/models/schedule.model';
import { SchedulesService } from 'src/app/state/schedules.table';

export interface PeriodicElement {
  creator: string;
  title: string;
  description: string;
  location: string;
  start_time: Date;
  end_time: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 'Meeting', creator: 'Le Cao', description: 'Retro', location: 'Toorak', start_time: new Date('2021-09-27T03:24:00'), end_time: new Date('2021-09-27T04:24:00')},
  {title: 'Meeting', creator: 'Khuong Pham', description: 'Release', location: 'Toorak', start_time: new Date('2021-09-27T03:24:00'), end_time: new Date('2021-09-27T04:24:00')},
  {title: 'Meeting', creator: 'Tam Pham', description: 'Stand up', location: 'Toorak', start_time: new Date('2021-09-27T03:24:00'), end_time: new Date('2021-09-27T04:24:00')},
];

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit, OnDestroy {
  schedules: ScheduleModel[];
  private subscriptions: Subscription[]= [];
  constructor(private scheduleService: SchedulesService) { }

  ngOnInit(): void {
    const schedulesSubscription = this.scheduleService.getAllSchedules().subscribe(res => {
      this.schedules = res;
    })
    this.subscriptions.push(schedulesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  displayedColumns: string[] = ['title', 'creator', 'description', 'location', 'startTime', 'endTime', 'actions'];
}
