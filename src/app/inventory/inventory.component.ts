import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";
import { InventoryService } from "./inventory.service";
import { NavigateDirective } from "../navigate.directive";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: 'app-inventory',
	imports: [
		NavigateDirective,
		NgIf,
		FormsModule
	],
	templateUrl: './inventory.component.html',
	standalone: true,
})
export class InventoryComponent implements OnInit {

	inventories: any[] = [];
	filteredInventories: any[] = [];
	searchTerm: string = '';
	isSearching: boolean = false;

	get inventoriesSorted() {
		// если идет поиск, показываем только отфильтрованные
		if (this.isSearching) return this.filteredInventories;
		// иначе — все инвентари
		return this.inventories;
	}

	constructor(
		private global: GlobalService,
		private service: InventoryService,
	) {}

	get role() {
		return this.global.role;
	}

	get positionId() {
		return this.global.positionId;
	}

	ngOnInit(): void {
		this.service.inventorySubject.subscribe(value => {
			this.inventories = value.inventories;
			this.filteredInventories = value.inventories;
		});
		this.service.findAll();
	}

	filterInventories() {
		const term = this.searchTerm.trim();

		// Если строка поиска пуста — показать все
		if (!term) {
			this.isSearching = false;
			this.service.findAll();
			return;
		}

		this.isSearching = true;
		this.service.searchByName(term).subscribe({
			next: (res: any) => {
				this.filteredInventories = res.data || [];
			},
			error: err => {
				console.error(err);
				this.filteredInventories = [];
			}
		});
	}
}
