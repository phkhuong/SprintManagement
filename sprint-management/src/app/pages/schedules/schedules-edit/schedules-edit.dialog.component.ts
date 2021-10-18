import { Component, createPlatform, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleModel } from 'src/app/core/models/schedule.model';
import { SchedulesService } from 'src/app/state/schedules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedules-edit',
  templateUrl: './schedules-edit.dialog.component.html',
  styleUrls: ['./schedules-edit.dialog.component.css']
})
export class SchedulesEditDialogComponent implements OnInit, OnDestroy {
  scheduleForm: FormGroup;
  schedule: ScheduleModel;
  private subscriptions: Subscription [] = [];
  constructor(public dialogRef: MatDialogRef<SchedulesEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private scheduleService:SchedulesService, private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  ngOnInit(): void {
    this.schedule = this.data.schedule;
    this.createForm();
  }
  createForm():void {
    this.scheduleForm = this.fb.group({
      title: [this.schedule.title, Validators.required],
      description: this.schedule.description,
      location: this.schedule.location,
      startTime: [this.schedule.startTime,Validators.required],
      endTime: [this.schedule.endTime,Validators.required]
    })
  }

  onSubmit():void {
    const controls = this.scheduleForm.controls;
    if(this.scheduleForm.invalid){
      return;
    }
    const schedule = this.prepareSchedule();
    this.editSchedule(schedule)
  }

  editSchedule(schedule:ScheduleModel):void {
    this.subscriptions.push(this.scheduleService.updateSchedule(schedule).subscribe(res => {
      this.dialogRef.close({ schedule: schedule, isEdit: true });
    }));
  }
  
  prepareSchedule():ScheduleModel {
    const controls = this.scheduleForm.controls;
    const schedule = new ScheduleModel();

    schedule.id = this.schedule.id;
    schedule.title = controls['title'].value;
    schedule.description = controls['description'].value;
    schedule.location = controls['location'].value;
    schedule.startTime = controls['startTime'].value;
    schedule.endTime = controls['endTime'].value;

    return schedule;
  }
}


