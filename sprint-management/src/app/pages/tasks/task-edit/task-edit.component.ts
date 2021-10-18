import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TaskModel } from 'src/app/core/models/task.model';
import { TasksService } from 'src/app/state/tasks.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  task: TaskModel;
  isEditMode: Boolean = false;
  private subscriptions: Subscription[] = [];
  
  constructor(private taskService: TasksService, private fb: FormBuilder, private router:Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.task = new TaskModel();
    this.createForm();
    if(id != null){
      this.isEditMode = true;
      this.taskService.getTaskById(parseInt(id)).subscribe(res => {
        this.task = res;
        this.createForm();
      })
    }
  }
  createForm() {
    this.taskForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
      status: ["new", Validators.required]
    })
  }

  onSubmit():void {
    const controls = this.taskForm.controls;
    if(this.taskForm.invalid){
      return;
    }
    const task = this.prepareTask();
    if(!task.id)
      this.createTask(task)
    else
      this.editTask(task)
  }

  editTask(task: TaskModel) {
    this.taskService.updateTask(task).subscribe(res => {
      this.router.navigate(['/']);
    })
  }

  createTask(task:TaskModel):void {
    this.taskService.createTask(task).subscribe(res => {
      this.router.navigate(['/']);
    })
  }
  
  prepareTask():TaskModel {
    const controls = this.taskForm.controls;
    const task = new TaskModel();

    task.id = this.task.id;
    task.title = controls['title'].value;
    task.description = controls['description'].value;
    task.status = controls['status'].value;

    return task;
  }

  cancelChanges():void {
    this.router.navigate(['/']);
  }

  delete(){
    this.taskService.deleteTask(this.task.id).subscribe(res => {
      this.router.navigate(['/']);
    })
  }

  ngOnDestroy(): void {
  }

  

}
