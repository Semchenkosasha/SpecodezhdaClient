import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {Router} from "@angular/router";
import {WorkwearOrderingService} from "./workwear-ordering.service";
import {NavigateDirective} from "../navigate.directive";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-workwear-ordering',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './workwear-ordering.component.html',
	standalone: true,
})

export class WorkwearOrderingComponent implements OnInit {

	private orderings: any[] = [];

	get orderingsSorted() {
		let res = this.orderings;

		return res;
	}

	constructor(
		private global: GlobalService,
		private router: Router,
		private service: WorkwearOrderingService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		if (this.role === 'NOT') this.router.navigate(['/login'])

		this.service.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.service.findAll();
	}

	approved(id: number) {
		this.service.approved(id);
	}

	loss(id: number) {
		this.service.loss(id);
	}

	marriage(id: number) {
		this.service.marriage(id);
	}

	wearAndTire(id: number) {
		this.service.wearAndTire(id);
	}

	archive(id: number) {
		this.service.archive(id);
	}

}
