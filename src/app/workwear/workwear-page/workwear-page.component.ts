import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {WorkwearService} from "../workwear.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {WorkwearOrderingService} from "../../workwear-ordering/workwear-ordering.service";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-workwear-page',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './workwear-page.component.html',
	standalone: true,
})

export class WorkwearPageComponent implements OnInit {

	workwear: any = {
		name: '',
	}

	constructor(
		private global: GlobalService,
		private service: WorkwearService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private orderingService: WorkwearOrderingService,
		private alert: AlertService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		if (this.role === 'NOT') this.router.navigate(['/login'])

		this.activatedRoute.queryParams.subscribe(value => {
			this.service.find(value['id']).subscribe({
				next: (res: any) => this.workwear = res.data,
				error: (e: any) => {
					console.log(e.error)
					if (e.error.code === 404) {
						this.router.navigate(['/error'], {queryParams: {message: e.error.message}});
					} else {
						this.router.navigate(['/login'])
					}
				}
			})
		})
	}

	delete() {
		this.service.delete(this.workwear.id);
	}

	ordering() {
		this.orderingService.save(this.workwear.id).subscribe({
			next: () => {
				this.alert.add("Заявка оформлена", "info")
				this.service.find(this.workwear.id).subscribe({
					next: (res: any) => this.workwear = res.data,
				})
			},
			error: (e: any) => {
				console.log(e.error)
				this.alert.add(e.error.message)
			},
		})
	}

}
