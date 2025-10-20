import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import {WorkwearOrderingService} from "../workwear-ordering.service";

@Component({
	selector: 'app-workwear-ordering-my',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './workwear-ordering-my.component.html',
	standalone: true,
})

export class WorkwearOrderingMyComponent implements OnInit {

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
		if (this.role !== 'USER') this.router.navigate(['/login'])

		this.service.orderingSubject.subscribe(value => {
			this.orderings = value.my;
		})
		this.service.findAllMy();
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

}
