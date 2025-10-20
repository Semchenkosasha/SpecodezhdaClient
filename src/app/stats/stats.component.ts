import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";
import {
	InventoriesOrderingsStatusesComponent
} from "./inventories-orderings-statuses/inventories-orderings-statuses.component";
import {InventoriesQuantitiesComponent} from "./inventories-quantities/inventories-quantities.component";
import {PositionsUsersCountComponent} from "./positions-users-count/positions-users-count.component";
import {
	WorkwearsOrderingsStatusesComponent
} from "./workwears-orderings-statuses/workwears-orderings-statuses.component";
import {WorkwearsQuantitiesComponent} from "./workwears-quantities/workwears-quantities.component";

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [
		NgApexchartsModule,
		FormsModule,
		InventoriesOrderingsStatusesComponent,
		InventoriesQuantitiesComponent,
		PositionsUsersCountComponent,
		WorkwearsOrderingsStatusesComponent,
		WorkwearsQuantitiesComponent
	],
	templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

	constructor(
		private router: Router,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.router.navigate(['/login']);
	}

}
