import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {InventoryCategoryService} from "./inventory-category.service";
import {InventoryCategoryCardComponent} from "./inventory-category-card/inventory-category-card.component";

@Component({
	selector: 'app-inventory-category',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		InventoryCategoryCardComponent
	],
	templateUrl: './inventory-category.component.html',
	standalone: true,
})

export class InventoryCategoryComponent implements OnInit {

	categories: any[] = [];

	categoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private router: Router,
		private global: GlobalService,
		private categoryService: InventoryCategoryService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.findAll();
	}

	save() {
		this.categoryService.save(this.categoryFormGroup.value);
		this.categoryFormGroup.reset();
	}

}
