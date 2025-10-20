import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})

export class InventoryOrderingService {

	orderingSubject = new BehaviorSubject({
		orderings: [],
		my: [],
	})

	constructor(
		private global: GlobalService,
		private alert: AlertService,
		private http: HttpClient,
	) {
	}

	private get url() {
		return this.global.backendURL + '/inventories/orderings';
	}

	private error(e: any) {
		console.log(e.error)
		this.alert.add(e.error.message);
	}

	findAll() {
		this.http.get(
			this.url,
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => {
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: res.data,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

	findAllMy() {
		this.http.get(
			this.url + '/my',
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => {
				this.orderingSubject.next({
					...this.orderingSubject.value,
					my: res.data,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

	findMy(id: number) {
		return this.http.get(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		)
	}

	save(inventoryId: number) {
		return this.http.post(
			this.url,
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({inventoryId: inventoryId})
			},
		)
	}

	approved(id: number) {
		this.http.patch(
			this.url + `/${id}/approved`,
			"",
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings: any = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => i.id !== id)
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
				this.alert.add("Одобрено", "info");
			},
			error: (e: any) => this.error(e),
		})
	}

	loss(id: number) {
		this.http.patch(
			this.url + `/${id}/loss`,
			"",
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings: any = this.orderingSubject.value.my;
				orderings = orderings.filter((i: any) => i.id !== id)
				this.orderingSubject.next({
					...this.orderingSubject.value,
					my: orderings,
				})
				this.alert.add("Заявка оформлена", "info");
			},
			error: (e: any) => this.error(e),
		})
	}

	marriage(id: number) {
		this.http.patch(
			this.url + `/${id}/marriage`,
			"",
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings: any = this.orderingSubject.value.my;
				orderings = orderings.filter((i: any) => i.id !== id)
				this.orderingSubject.next({
					...this.orderingSubject.value,
					my: orderings,
				})
				this.alert.add("Заявка оформлена", "info");
			},
			error: (e: any) => this.error(e),
		})
	}

	wearAndTire(id: number) {
		this.http.patch(
			this.url + `/${id}/wearAndTire`,
			"",
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings: any = this.orderingSubject.value.my;
				orderings = orderings.filter((i: any) => i.id !== id)
				this.orderingSubject.next({
					...this.orderingSubject.value,
					my: orderings,
				})
				this.alert.add("Заявка оформлена", "info");
			},
			error: (e: any) => this.error(e),
		})
	}

	archive(id: number) {
		this.http.patch(
			this.url + `/${id}/archive`,
			"",
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings: any = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => i.id !== id)
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

}
