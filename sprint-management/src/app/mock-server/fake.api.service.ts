// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';

import {AppDataContext} from './data/data-context/app.data-context'

import { ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions, STATUS, getStatusText  } from 'angular-in-memory-web-api';
import { UsersTable } from './data/tables/users.table';
import { HttpRequest } from '@angular/common/http';
import { Credential } from 'src/app/core/models/credentials';



@Injectable()
export class FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
	constructor() {}

	/**
	 * Create Fake DB and API
	 */
	createDb(): {} | Observable<{}> {
		// tslint:disable-next-line:class-name
		const db = {
			users: AppDataContext.users,
			tasks: AppDataContext.tasks,
			schedules: AppDataContext.schedules
		};
		return db;
	}

	post(reqInfo: RequestInfo) {
		const collectionName = reqInfo.collectionName;
		if (collectionName === 'login') {
		  return this.authenticate(reqInfo);
		}
		return undefined; // let the default GET handle all others
	}

	private authenticate(reqInfo: RequestInfo) {
		return reqInfo.utils.createResponse$(() => {
			console.log('HTTP POST override');
			console.log(reqInfo);
			var req = reqInfo.req as HttpRequest<Credential>
			// const collection = AppDataContext.users.slice();
			// console.log(collection);
			const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
			//const db = reqInfo.utils.getDb();
			//console.log(db);
			// tslint:disable-next-line:triple-equals
			// const data = id == undefined ? collection : reqInfo.utils.findById(collection, id);
			var data = null;
			if(req.body.username == "admin" && req.body.password == "pass@123"){
				data = {
					username: "admin",
					token: 'fake-jwt-token'
				}
			}
			const options: ResponseOptions = data ?
			  {
				body: dataEncapsulation ? { data } : data,
				status: STATUS.OK
			  } :
			  {
				body: { error: `Invalid username or password` },
				status: STATUS.UNAUTHORIZED
			  };
			return this.finishOptions(options, reqInfo);
		  });
	}

	private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
		options.statusText = getStatusText(options.status);
		options.headers = headers;
		options.url = url;
		return options;
	}
	

}
