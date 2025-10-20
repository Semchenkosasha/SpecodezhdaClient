import {Component, OnInit} from '@angular/core';
import {StatsService} from "../stats.service";
import {ChartComponent} from "ng-apexcharts";

@Component({
	selector: 'app-inventories-orderings-statuses',
	imports: [
		ChartComponent
	],
	templateUrl: './inventories-orderings-statuses.component.html',
	standalone: true,
})

export class InventoriesOrderingsStatusesComponent implements OnInit{

	chartOptions: any;

	names: any[] = [];
	values: any[] = [];

	constructor(
		private stats: StatsService,
	) {
	}

	ngOnInit(): void {
		this.stats.inventoriesOrderingsStatuses().subscribe({
			next: (res: any) => {
				this.names = res.data.names;
				this.values = res.data.values;
				this.draw()
			}
		})
	}

	draw() {
		this.chartOptions = {
			labels: this.names,
			series: this.values,
			chart: {
				height: 400,
				type: "donut"
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: "bottom"
						}
					}
				}
			]
		};
	}

}
