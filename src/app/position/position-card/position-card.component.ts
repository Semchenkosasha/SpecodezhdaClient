import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PositionService} from "../position.service";

@Component({
	selector: 'app-position-card',
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './position-card.component.html',
	standalone: true,
})

export class PositionCardComponent implements OnInit {

	@Input() position: any;

	positionFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private positionService: PositionService,
	) {
	}

	ngOnInit(): void {
		this.positionFormGroup.setValue({
			name: this.position.name,
		})
	}

	update() {
		this.positionService.update(this.position.id, this.positionFormGroup.value);
	}

	delete() {
		this.positionService.delete(this.position.id);
	}

}
