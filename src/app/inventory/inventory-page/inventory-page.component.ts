import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../inventory.service";
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {InventoryOrderingService} from "../../inventory-ordering/inventory-ordering.service";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-inventory-page',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './inventory-page.component.html',
	standalone: true,
})

export class InventoryPageComponent implements OnInit {

	inventory: any = {
		name: '',
	}

	constructor(
		private global: GlobalService,
		private service: InventoryService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private orderingService: InventoryOrderingService,
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
				next: (res: any) => this.inventory = res.data,
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
		this.service.delete(this.inventory.id);
	}

	ordering() {
		this.orderingService.save(this.inventory.id).subscribe({
			next: () => {
				this.alert.add("Заявка оформлена", "info")
				this.service.find(this.inventory.id).subscribe({
					next: (res: any) => this.inventory = res.data,
				})
			},
			error: (e: any) => {
				console.log(e.error)
				this.alert.add(e.error.message)
			},
		})
	}

}
