import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

import {ScheduleModel} from '../core/models/schedule.model';
import {HttpUtilsService} from '../core/services/httpUtils.service'

const API_SCHEDULES_URL = 'api/schedules';

@Injectable()
export class SchedulesService {
    constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createSchedule(schedule: ScheduleModel): Observable<ScheduleModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ScheduleModel>(API_SCHEDULES_URL, schedule, { headers: httpHeaders});
	}

	getAllSchedules(): Observable<ScheduleModel[]> {
		return this.http.get<ScheduleModel[]>(API_SCHEDULES_URL);
	}

    getScheduleById(scheduleId: number): Observable<ScheduleModel> {
		return this.http.get<ScheduleModel>(API_SCHEDULES_URL + `/${scheduleId}`);
	}

    updateSchedule(schedule: ScheduleModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_SCHEDULES_URL, schedule, { headers: httpHeader });
	}

    deleteSchedule(scheduleId: number): Observable<any> {
		const url = `${API_SCHEDULES_URL}/${scheduleId}`;
		return this.http.delete<ScheduleModel>(url);
	}
}
