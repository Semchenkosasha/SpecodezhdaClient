import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "./global.service";

@Injectable({
	providedIn: 'root'
})

export class EnumService {

	enumSubject = new BehaviorSubject<any>({
		roles: [],
		workwearSizes: [],
		workwearCategories: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/enums';
	}

	roles() {
		this.http.get(
			this.url + '/roles',
		).subscribe({
			next: (res: any) => this.enumSubject.next({
				...this.enumSubject.value,
				roles: res.data,
			}),
			error: (e: any) => console.log(e.error),
		})
	}

	workwearSizes() {
		this.http.get(
			this.url + '/workwearSizes',
		).subscribe({
			next: (res: any) => this.enumSubject.next({
				...this.enumSubject.value,
				workwearSizes: res.data,
			}),
			error: (e: any) => console.log(e.error),
		})
	}

	workwearCategories() {
		this.http.get(
			this.url + '/workwearCategories',
		).subscribe({
			next: (res: any) => this.enumSubject.next({
				...this.enumSubject.value,
				workwearCategories: res.data,
			}),
			error: (e: any) => console.log(e.error),
		})
	}

}
