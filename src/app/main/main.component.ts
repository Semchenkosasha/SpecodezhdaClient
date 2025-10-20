import {Component, OnInit} from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [],
	templateUrl: './main.component.html',
})

export class MainComponent implements OnInit {

	ngOnInit(): void {
		const toastEl1 = document.getElementById('liveToast1');
		const toastEl2 = document.getElementById('liveToast2');
		const toastEl3 = document.getElementById('liveToast3');
		if (toastEl1) {
			const toast = new Toast(toastEl1); // Toast с правильным типом
			toast.show();
		}
		if (toastEl2) {
			const toast = new Toast(toastEl2); // Toast с правильным типом
			toast.show();
		}
		if (toastEl3) {
			const toast = new Toast(toastEl3); // Toast с правильным типом
			toast.show();
		}
	}

}
