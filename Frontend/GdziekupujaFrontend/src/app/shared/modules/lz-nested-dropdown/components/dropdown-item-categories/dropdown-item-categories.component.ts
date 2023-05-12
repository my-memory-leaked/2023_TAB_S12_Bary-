import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Categories } from '@modules/offers/interfaces/offers.interface';

@Component({
  selector: 'lz-dropdown-item-categories',
  templateUrl: './dropdown-item-categories.component.html',
  styleUrls: ['./dropdown-item-categories.component.scss']
})
export class DropdownItemCategoriesComponent {

  @Input() childData: Categories[];
  @Output() emitChild = new EventEmitter<Categories>();
  @ViewChild('childMenu') public childMenu: any;

  navChildData: Categories[];

  changeItem(item: Categories) {
    this.emitChild.emit(item);
  }
}
