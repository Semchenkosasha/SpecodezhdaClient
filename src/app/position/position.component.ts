import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PositionService} from "./position.service";
import {PositionCardComponent} from "./position-card/position-card.component";

@Component({
	selector: 'app-position',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		PositionCardComponent
	],
	templateUrl: './position.component.html',
	standalone: true,
})

export class PositionComponent implements OnInit {

	positions: any[] = [];

	positionFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private router: Router,
		private global: GlobalService,
		private positionService: PositionService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.router.navigate(['/login']);

		this.positionService.positionSubject.subscribe(value => {
			this.positions = value.positions;
		})
		this.positionService.findAll();
	}

	save() {
		this.positionService.save(this.positionFormGroup.value);
		this.positionFormGroup.reset();
	}

}
