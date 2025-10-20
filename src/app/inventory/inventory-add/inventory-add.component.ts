import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import {InventoryService} from "../inventory.service";
import {InventoryCategoryService} from "../../inventory-category/inventory-category.service";
import {NavigateDirective} from "../../navigate.directive";
import {PositionService} from "../../position/position.service";

@Component({
	selector: 'app-inventory-add',
	imports: [
		FormsModule,
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './inventory-add.component.html',
	standalone: true,
})

export class InventoryAddComponent implements OnInit {

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
		private positionService: PositionService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.router.navigate(['/login'])

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
		if (this.img === null) return true;
		if (this.categoryId === null) return true;

		return false;
	}

	save() {
		this.service.save(this.inventoryFormGroup.value, this.categoryId, this.positionId, this.img);
	}

}
