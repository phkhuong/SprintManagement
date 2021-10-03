import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

import {UserModel} from '../core/models/user.model';
import {HttpUtilsService} from '../core/services/httpUtils.service'

const API_USERS_URL = 'api/users';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createUser(user: UserModel): Observable<UserModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<UserModel>(API_USERS_URL, user, { headers: httpHeaders});
	}

	getAllUsers(): Observable<UserModel[]> {
		return this.http.get<UserModel[]>(API_USERS_URL);
	}

    getUserById(userId: number): Observable<UserModel> {
		return this.http.get<UserModel>(API_USERS_URL + `/${userId}`);
	}

    updateUser(user: UserModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_USERS_URL, user, { headers: httpHeader });
	}

    deleteUser(userId: number): Observable<any> {
		const url = `${API_USERS_URL}/${userId}`;
		return this.http.delete<UserModel>(url);
	}
}
