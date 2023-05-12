import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminDropDown } from '@modules/admin/constants/admin-dropdown.const';
import { AdminDropdownData } from '@modules/admin/interfaces/admin-dropdown.interface';
import { AdminFormResponse } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminFormService } from '@modules/admin/services/admin-form.service';
import { ADMIN_RESPONSE_TOKEN } from '@modules/admin/tokens/admin-response.token';
import { AdminOperationDetailsComponent } from '@modules/admin/components/admin-operation-details/admin-operation-details.component';
import { NestedDropdown } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
	selector: 'admin-operation-type',
	templateUrl: './admin-operation-type.component.html',
	styleUrls: ['./admin-operation-type.component.scss']
})

export class AdminOperationTypeComponent {

	adminOperationType: NestedDropdown<AdminDropdownData>;
	myInjector: Injector;
	AdminOperationDetails = AdminOperationDetailsComponent;
	formResponse: AdminFormResponse = {
		dropdown: null,
	};

	readonly navData = AdminDropDown;

	constructor(
		private injector: Injector,
	) { }

	handleDropdownChange(adminOperationType: NestedDropdown<unknown>): void {
		this.adminOperationType = adminOperationType as NestedDropdown<AdminDropdownData>;
		this.formResponse.dropdown = adminOperationType as NestedDropdown<AdminDropdownData>;
		this.createInjector();
	}

	private createInjector(): void {
		this.myInjector = Injector.create({
			providers: [
				{
					provide: AdminFormService,
					useClass: this.adminOperationType.data.formProvider,
					deps: [FormBuilder],
				},
				{
					provide: ADMIN_RESPONSE_TOKEN,
					useValue: this.formResponse,
					deps: [],
				},
			],
			parent: this.injector,
		});
	}
}
