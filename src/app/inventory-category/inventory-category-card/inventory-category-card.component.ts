import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InventoryCategoryService} from "../inventory-category.service";

@Component({
	selector: 'app-inventory-category-card',
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './inventory-category-card.component.html',
	standalone: true,
})

export class InventoryCategoryCardComponent implements OnInit {

	@Input() category: any;

	categoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private categoryService: InventoryCategoryService,
	) {
	}

	ngOnInit(): void {
		this.categoryFormGroup.setValue({
			name: this.category.name,
		})
	}

	update() {
		this.categoryService.update(this.category.id, this.categoryFormGroup.value);
	}

	delete() {
		this.categoryService.delete(this.category.id);
	}

}
