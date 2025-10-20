import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnumService} from "../../enum.service";
import {PositionService} from "../../position/position.service";
import {WorkwearService} from "../workwear.service";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-workwear-update',
	imports: [
		KeyValuePipe,
		NavigateDirective,
		NgForOf,
		ReactiveFormsModule
	],
	templateUrl: './workwear-update.component.html',
	standalone: true,
})

export class WorkwearUpdateComponent implements OnInit {

	id: any = null;

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
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.router.navigate(['/login'])

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['id'];
			this.service.find(value['id']).subscribe({
				next: (res: any) => {
					this.workwearFormGroup.setValue({
						name: res.data.name,
						quantity: res.data.quantity,
						provider: res.data.provider,
						lifetime: res.data.lifetime,
						description: res.data.description,
					})
					this.size = res.data.size;
					this.category = res.data.category;
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
		if (this.size === "") return true;
		if (this.category === "") return true;
		if (this.positionId === null) return true;

		return false;
	}

	update() {
		this.service.update(this.id,this.workwearFormGroup.value, this.size, this.category, this.positionId, this.img);
	}

}
