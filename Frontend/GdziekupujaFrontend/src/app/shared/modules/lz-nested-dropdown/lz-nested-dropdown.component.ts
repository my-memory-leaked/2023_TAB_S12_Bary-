import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NestedDropdown } from './interfaces/nested-dropdown.interface';
import { NestedDropdownService } from './services/nested-dropdown.service';
import { Categories } from '@modules/offers/interfaces/offers.interface';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'lz-nested-dropdown',
  templateUrl: './lz-nested-dropdown.component.html',
  styleUrls: ['./lz-nested-dropdown.component.scss']
})
export class LzNestedDropdownComponent {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  @Input() set categoriesData(value: Categories[]) {
    this.categoryItems = [];
    if (value) {
      this.categoryItems = value;
    }
  }

  @Input() set navigationData(value: NestedDropdown<unknown>[]) {
    if (value)
      this.navData = this.nestedDropdownService.getFiltredNav(value);
  }
  @Input() set name(value: string) {
    this.functionName = value;
    this.functionNameStorage = value;
  }
  @Input() inAdmin = false;
  @Input() addClear = false;
  @Output() dropdownChange = new EventEmitter<any>();

  navData: NestedDropdown<unknown>[];
  categoryItems: Categories[] = [];
  functionName: string;
  functionNameStorage: string;

  constructor(
    private nestedDropdownService: NestedDropdownService,
  ) { }

  changeDropdown(item: any, isCategory: boolean) {
    if (isCategory)
      this.functionName = (item.id === -1) ? this.functionNameStorage : item.name;

    this.functionName = this.inAdmin ? this.functionNameStorage : item.name;

    this.dropdownChange.emit(item);
    this.menuTrigger.closeMenu();
  }

  clearDropdown() {
    this.functionName = this.functionNameStorage;
    this.dropdownChange.emit({});
    this.menuTrigger.closeMenu();
  }
}
