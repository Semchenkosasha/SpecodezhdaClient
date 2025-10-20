import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})

export class InventoryService {

	inventorySubject = new BehaviorSubject({
		inventories: [],
	})

	constructor(
		private global: GlobalService,
		private alert: AlertService,
		private http: HttpClient,
		private router: Router,
	) {
	}

	private get url() {
		return this.global.backendURL + '/inventories';
	}

	private error(e: any) {
		console.log(e.error)
		this.alert.add(e.error.message);
	}

	private page(id: number) {
		this.router.navigate(['/inventory'], {queryParams: {id: id}})
	}

	findAll() {
		this.http.get(
			this.url,
		).subscribe({
			next: (res: any) => {
				this.inventorySubject.next({
					...this.inventorySubject.value,
					inventories: res.data,
				})
			},
			error: (e: any) => this.error(e),
		})
	}

	find(id: number) {
		return this.http.get(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		)
	}

	save(inventory: any, categoryId: number, positionId: number, img: any) {
		this.http.post(
			this.url,
			JSON.stringify(inventory),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: categoryId,
					positionId: positionId,
				})
			},
		).subscribe({
			next: (res: any) => this.updateImg(res.data.id, img),
			error: (e: any) => this.error(e),
		})
	}

	update(id: number, inventory: any, categoryId: number, positionId: number, img: any) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(inventory),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: categoryId,
					positionId: positionId
				})
			},
		).subscribe({
			next: (res: any) => {
				if (img !== null) this.updateImg(res.data.id, img)
				else this.page(res.data.id)
			},
			error: (e: any) => this.error(e),
		})
	}

	private updateImg(id: number, img: any) {
		let formData = new FormData();
		for (let i = 0; i < img.length; i++) {
			formData.append('files', img[i]);
		}
		this.http.patch(
			this.url + `/${id}/img`,
			formData,
			{headers: this.global.headersMultipartToken,},
		).subscribe({
			next: (res: any) => this.page(res.data.id),
			error: (e: any) => this.error(e),
		})
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => this.router.navigate(['/inventories']),
			error: (e: any) => this.error(e),
		})
	}
	searchByName(name: string) {
		const url = `${this.global.backendURL}/inventories/search`;
		return this.http.get(url, {
			params: new HttpParams().set('name', name),
		});
	}
}
