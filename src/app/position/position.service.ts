import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class PositionService {

	positionSubject = new BehaviorSubject<any>({
		positions: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/positions'
	}

	private error(e: any) {
		console.log(e.error);
		this.alert.add(e.error.message);
	}

	findAll() {
		this.http.get(
			this.url,
		).subscribe({
			next: (res: any) => this.positionSubject.next({
				...this.positionSubject.value,
				positions: res.data,
			}),
			error: (e: any) => this.error(e),
		})
	}

	save(position: any) {
		this.http.post(
			this.url,
			JSON.stringify(position),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => this.positionSubject.next({
				...this.positionSubject.value,
				positions: [res.data, ...this.positionSubject.value.positions],
			}),
			error: (e: any) => this.error(e),
		})
	}

	update(id: number, position: any) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(position),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => {
				let positions = this.positionSubject.value.positions;
				positions = positions.map((i: any) => i.id === id ? res.data : i);
				this.positionSubject.next({
					...this.positionSubject.value,
					positions: positions,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		).subscribe({
			next: () => {
				let positions = this.positionSubject.value.positions;
				positions = positions.filter((i: any) => i.id !== id);
				this.positionSubject.next({
					...this.positionSubject.value,
					positions: positions,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

}
