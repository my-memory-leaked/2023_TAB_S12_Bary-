import { Injectable } from '@angular/core';
import { NestedDropdown } from '../interfaces/nested-dropdown.interface';

@Injectable()
export class NestedDropdownService {

  getFiltredNav(nav: NestedDropdown<unknown>[]): NestedDropdown<unknown>[] {
    return nav.filter((item) => this.canStayInNav(item));
  }

  canStayInNav(item: NestedDropdown<unknown>): boolean {
    if (!item.children && item.data)
      return true;
    if (item.children.length > 0) {
      item.children = item.children.filter((item) => this.canStayInNav(item));
      return item.children.length > 0;
    }
    return false;
  }
}
