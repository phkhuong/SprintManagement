// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';

import {AppDataContext} from './data/data-context/app.data-context'

import { ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions, STATUS, getStatusText  } from 'angular-in-memory-web-api';


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

	// post(reqInfo: RequestInfo) {
	// 	const collectionName = reqInfo.collectionName;
	// 	if (collectionName === 'login') {
	// 	  return this.authenticate(reqInfo);
	// 	}
	// 	return undefined; // let the default GET handle all others
	// }

	// private authenticate(reqInfo: RequestInfo) {
	// 	return reqInfo.utils.createResponse$(() => {
	// 		console.log('HTTP GET override');
	  
	// 		// const collection = villains.slice();
	// 		const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
	// 		const id = reqInfo.id;
	  
	// 		// tslint:disable-next-line:triple-equals
	// 		const data = id == undefined ? collection : reqInfo.utils.findById(collection, id);
	  
	// 		const options: ResponseOptions = data ?
	// 		  {
	// 			body: dataEncapsulation ? { data } : data,
	// 			status: STATUS.OK
	// 		  } :
	// 		  {
	// 			body: { error: `'Villains' with id='${id}' not found` },
	// 			status: STATUS.NOT_FOUND
	// 		  };
	// 		return this.finishOptions(options, reqInfo);
	// 	  });
	// }

	// private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
	// 	options.statusText = getStatusText(options.status);
	// 	options.headers = headers;
	// 	options.url = url;
	// 	return options;
	// }
	

}
