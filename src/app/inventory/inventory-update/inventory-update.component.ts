import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../inventory.service";
import {InventoryCategoryService} from "../../inventory-category/inventory-category.service";
import {NavigateDirective} from "../../navigate.directive";
import {PositionService} from "../../position/position.service";

@Component({
	selector: 'app-inventory-update',
	imports: [
		FormsModule,
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './inventory-update.component.html',
	standalone: true,
})

export class InventoryUpdateComponent implements OnInit {

	id: any = null;

	inventoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		quantity: new FormControl("", [Validators.required, Validators.min(0), Validators.max(1000000)]),
		provider: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		lifetime: new FormControl("", [Validators.required, Validators.min(0), Validators.max(2000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
	})

	categoryId: any = null;
	categories: any[] = [];

	positionId: any = null;
	positions: any[] = [];

	img: any = null;

	constructor(
		private global: GlobalService,
		private router: Router,
		private service: InventoryService,
		private categoriesService: InventoryCategoryService,
		private activatedRoute: ActivatedRoute,
		private positionService: PositionService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.router.navigate(['/login'])

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['id'];
			this.service.find(value['id']).subscribe({
				next: (res: any) => {
					this.inventoryFormGroup.setValue({
						name: res.data.name,
						quantity: res.data.quantity,
						provider: res.data.provider,
						lifetime: res.data.lifetime,
						description: res.data.description,
					})
					this.categoryId = res.data.categoryId;
					this.positionId = res.data.positionId;
				},
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

		this.categoriesService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoriesService.findAll();

		this.positionService.positionSubject.subscribe(value => {
			this.positions = value.positions;
		})
		this.positionService.findAll();
	}

	changeCategoryId(event: any) {
		this.categoryId = event.target.value;
	}

	changePositionId(event: any) {
		this.positionId = event.target.value;
	}

	changeImg(event: any) {
		this.img = event.target.files;
	}

	checkSubmit() {
		if (this.inventoryFormGroup.invalid) return true;
		if (this.categoryId === null) return true;

		return false;
	}

	update() {
		this.service.update(this.id, this.inventoryFormGroup.value, this.categoryId, this.positionId, this.img);
	}

}
