import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AlertService, AlertType} from "./alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class GlobalService {

	constructor(
		private alertService: AlertService,
	) {
	}

	public alert(e: any) {
		console.log(e.error)
		this.alertService.add(e.error.data || e.error.message)
	}

	public set(data: any) {
		this.userid = data.user.id;
		this.positionId = data.user.positionId;
		this.role = data.user.role;
		this.token = data.token;
	}

	public clear() {
		this.userid = 0;
		this.positionId = 0;
		this.role = 'NOT';
		this.token = '';
	}

	get userid(): number {
		return Number(localStorage.getItem('userid')) || 0;
	}

	set userid(value: number) {
		localStorage.setItem('userid', value + '');
	}

	get positionId(): number {
		return Number(localStorage.getItem('positionId')) || 0;
	}

	set positionId(value: number) {
		localStorage.setItem('positionId', value + '');
	}

	get role(): string {
		return localStorage.getItem('role') || 'NOT';
	}

	set role(value: string) {
		localStorage.setItem('role', value);
	}

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	set token(value: string) {
		localStorage.setItem('token', value);
	}

	get backendURL(): string {
		return 'http://localhost:8080';
	}

	get headersToken() {
		return new HttpHeaders({
			'Authorization': 'Bearer ' + this.token,
		});
	}

	get headersJsonToken() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.token,
		});
	}

	get headersMultipartToken() {
		return new HttpHeaders({
			'enctype': 'multipart/form-data',
			'Authorization': 'Bearer ' + this.token,
		});
	}
}
