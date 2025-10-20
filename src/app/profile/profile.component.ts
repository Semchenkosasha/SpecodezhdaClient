import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {Router} from "@angular/router";
import {ProfileService} from "./profile.service";
import {AlertService} from "../alert/alert.service";
import {FormsModule} from "@angular/forms";
import {EnumService} from "../enum.service";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {PositionService} from "../position/position.service";

@Component({
	selector: 'app-profile',
	imports: [
		FormsModule,
		NgIf,
		NgForOf,
		KeyValuePipe
	],
	templateUrl: './profile.component.html',
	standalone: true,
})

export class ProfileComponent implements OnInit {

	profile: any;

	workwearSizes: any[] = [];
	positions: any[] = [];

	constructor(
		private global: GlobalService,
		private alert: AlertService,
		private router: Router,
		private profileService: ProfileService,
		private enumService: EnumService,
		private positionService: PositionService,
	) {
	}

	get role() {
		return this.global.role;
	}

	private error(e: any) {
		console.log(e.error);
		this.alert.add(e.error.message);
	}

	ngOnInit(): void {
		if (this.role === 'NOT') this.router.navigate(['/login'])

		if (this.role === 'USER') {
			this.enumService.enumSubject.subscribe(value => {
				this.workwearSizes = value.workwearSizes;
			})
			this.enumService.workwearSizes();

			this.positionService.positionSubject.subscribe(value => {
				this.positions = value.positions;
			})
			this.positionService.findAll();
		}

		this.profileService.find().subscribe({
			next: (res: any) => this.profile = res.data,
			error: (e: any) => this.error(e),
		})
	}

	updateImg(event: any) {
		this.profileService.updateImg(event.target.files).subscribe({
			next: (res: any) => this.profile = res.data,
			error: (e: any) => this.error(e),
		})
	}

	updateFio() {
		this.profileService.updateFio(this.profile.fio,this.profile.shoe).subscribe({
			next: (res: any) => {
				this.profile = res.data
				this.alert.add("Данные обновлены", "success")
			},
			error: (e: any) => this.error(e),
		})
	}

	updateWorkwearSize(event: any) {
		this.profileService.updateWorkwearSize(event.target.value).subscribe({
			next: (res: any) => {
				this.profile = res.data
				this.alert.add("Данные обновлены", "success")
			},
			error: (e: any) => this.error(e),
		})
	}

	updatePosition(event: any) {
		this.profileService.updatePosition(event.target.value).subscribe({
			next: (res: any) => {
				this.profile = res.data
				this.alert.add("Данные обновлены", "success")
			},
			error: (e: any) => this.error(e),
		})
	}

}
