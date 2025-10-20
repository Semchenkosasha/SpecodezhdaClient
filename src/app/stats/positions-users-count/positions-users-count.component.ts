import {Component, OnInit} from '@angular/core';
import {StatsService} from "../stats.service";
import {ChartComponent} from "ng-apexcharts";

@Component({
	selector: 'app-positions-users-count',
	imports: [
		ChartComponent
	],
	templateUrl: './positions-users-count.component.html',
	standalone: true,
})

export class PositionsUsersCountComponent implements OnInit {

	chartOptions: any;

	names: any[] = [];
	values: any[] = [];

	constructor(
		private stats: StatsService,
	) {
	}

	ngOnInit(): void {
		this.stats.positionsUsersCount().subscribe({
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
