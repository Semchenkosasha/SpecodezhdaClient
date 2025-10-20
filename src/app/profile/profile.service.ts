import {Injectable} from '@angular/core';
import {GlobalService} from "../global.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})

export class ProfileService {

	constructor(
		private global: GlobalService,
		private http: HttpClient,
	) {
	}

	private get url() {
		return this.global.backendURL + '/users'
	}

	find() {
		return this.http.get(
			this.url,
			{headers: this.global.headersToken},
		);
	}

	updateFio(fio: string, shoe: number) {
		return this.http.patch(
			this.url + '/fio',
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({
					fio: fio,
					shoe: shoe,
				})
			},
		);
	}

	updateImg(files: any) {
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i])
		}
		return this.http.patch(
			this.url + '/img',
			formData,
			{headers: this.global.headersMultipartToken,},
		);
	}

	updateWorkwearSize(workwearSize: string) {
		return this.http.patch(
			this.url + '/workwearSize',
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({workwearSize: workwearSize})
			},
		);
	}

	updatePosition(positionId: string) {
		return this.http.patch(
			this.url + '/position',
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({positionId: positionId})
			},
		);
	}

}
