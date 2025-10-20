import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";
import { WorkwearService } from "./workwear.service";
import { NavigateDirective } from "../navigate.directive";
import { NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-workwear',
	imports: [
		NavigateDirective,
		NgIf,
		FormsModule
	],
	templateUrl: './workwear.component.html',
	standalone: true,
})
export class WorkwearComponent implements OnInit {

	workwears: any[] = [];
	filteredWorkwears: any[] = [];
	searchTerm: string = '';
	isSearching: boolean = false;

	constructor(
		private global: GlobalService,
		private service: WorkwearService,
	) {}

	get role() {
		return this.global.role;
	}

	get positionId() {
		return this.global.positionId;
	}

	get workwearsSorted() {
		// если выполняется поиск — показываем найденные
		if (this.isSearching) return this.filteredWorkwears;
		// иначе — все
		return this.workwears;
	}

	ngOnInit(): void {
		this.service.workwearSubject.subscribe(value => {
			this.workwears = value.workwears;
			this.filteredWorkwears = value.workwears;
		});
		this.service.findAll();
	}

	// Поиск по названию
	filterWorkwears() {
		const term = this.searchTerm.trim();

		// если строка пуста → показываем все
		if (!term) {
			this.isSearching = false;
			this.service.findAll();
			return;
		}

		this.isSearching = true;
		this.service.searchByName(term).subscribe({
			next: (res: any) => {
				this.filteredWorkwears = res.data || [];
			},
			error: err => {
				console.error('Ошибка при поиске', err);
				this.filteredWorkwears = [];
			}
		});
	}
}
