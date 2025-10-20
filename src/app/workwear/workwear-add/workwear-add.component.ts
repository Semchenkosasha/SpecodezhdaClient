import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EnumService} from "../../enum.service";
import {PositionService} from "../../position/position.service";
import {WorkwearService} from "../workwear.service";
import {KeyValuePipe, NgForOf} from "@angular/common";

@Component({
	selector: 'app-workwear-add',
	imports: [
		NavigateDirective,
		ReactiveFormsModule,
		NgForOf,
		KeyValuePipe
	],
	templateUrl: './workwear-add.component.html',
	standalone: true,
})

export class WorkwearAddComponent implements OnInit {

	workwearFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		quantity: new FormControl("", [Validators.required, Validators.min(0), Validators.max(1000000)]),
		provider: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		lifetime: new FormControl("", [Validators.required, Validators.min(0), Validators.max(2000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
	})

	size: string = "";
	sizes: any[] = [];

	category: string = "";
	categories: any[] = [];

	positionId: any = null;
	positions: any[] = [];

	img: any = null;

	constructor(
		private global: GlobalService,
		private router: Router,
		private enumService: EnumService,
		private positionService: PositionService,
		private service: WorkwearService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.router.navigate(['/login'])

		this.enumService.enumSubject.subscribe(value => {
			this.sizes = value.workwearSizes;
			this.categories = value.workwearCategories;
		})

		this.enumService.workwearSizes();
		this.enumService.workwearCategories();

		this.positionService.positionSubject.subscribe(value => {
			this.positions = value.positions;
		})
		this.positionService.findAll();
	}

	changeSize(event: any) {
		this.size = event.target.value;
	}

	changeCategory(event: any) {
		this.category = event.target.value;
	}

	changePositionId(event: any) {
		this.positionId = event.target.value;
	}

	changeImg(event: any) {
		this.img = event.target.files;
	}

	checkSubmit() {
		if (this.workwearFormGroup.invalid) return true;
		if (this.img === null) return true;
		if (this.size === "") return true;
		if (this.category === "") return true;
		if (this.positionId === null) return true;

		return false;
	}

	save() {
		this.service.save(this.workwearFormGroup.value, this.size, this.category, this.positionId, this.img);
	}

}
