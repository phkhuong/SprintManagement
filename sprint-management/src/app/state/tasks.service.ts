import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

import {TaskModel} from '../core/models/task.model';
import {HttpUtilsService} from '../core/services/http-utils.service'

const API_TASKS_URL = 'api/tasks';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createTask(task: TaskModel): Observable<TaskModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<TaskModel>(API_TASKS_URL, task, { headers: httpHeaders});
	}

	getAllTasks(): Observable<TaskModel[]> {
		return this.http.get<TaskModel[]>(API_TASKS_URL);
	}

    getTaskById(taskId: number): Observable<TaskModel> {
		return this.http.get<TaskModel>(API_TASKS_URL + `/${taskId}`);
	}

    updateTask(task: TaskModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_TASKS_URL, task, { headers: httpHeader });
	}

    deleteTask(taskId: number): Observable<any> {
		const url = `${API_TASKS_URL}/${taskId}`;
		return this.http.delete<TaskModel>(url);
	}
}
