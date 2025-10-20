import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	private get url() {
		return this.global.backendURL + '/stats'
	}

	workwearsOrderingsStatuses() {
		return this.http.get(
			this.url + '/workwears/orderings/statuses',
			{headers: this.global.headersToken}
		);
	}

	inventoriesOrderingsStatuses() {
		return this.http.get(
			this.url + '/inventories/orderings/statuses',
			{headers: this.global.headersToken}
		);
	}

	workwearsQuantities() {
		return this.http.get(
			this.url + '/workwears/quantities',
			{headers: this.global.headersToken}
		);
	}

	inventoriesQuantities() {
		return this.http.get(
			this.url + '/inventories/quantities',
			{headers: this.global.headersToken}
		);
	}

	positionsUsersCount() {
		return this.http.get(
			this.url + '/positions/users/count',
			{headers: this.global.headersToken}
		);
	}

}
