import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NestedDropdown } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
  selector: 'lz-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent {

  @Input() childData: NestedDropdown<unknown>[];
  @Output() emitChild = new EventEmitter<NestedDropdown<unknown>>();
  @ViewChild('childMenu') public childMenu: any;

  navChildData: NestedDropdown<unknown>[];

  changeItem(item: NestedDropdown<unknown>) {
    this.emitChild.emit(item);
  }
}
