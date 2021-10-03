import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilsService {
    getHTTPHeaders(): HttpHeaders {
		const result = new HttpHeaders();
		result.set('Content-Type', 'application/json');
		return result;
	}
}