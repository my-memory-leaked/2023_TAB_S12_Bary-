import { AdminDropdownData } from "@modules/admin/interfaces/admin-dropdown.interface";
import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";

export interface AdminFormResponse {
  dropdown: NestedDropdown<AdminDropdownData>,
}

export interface ChangedNames {
  id: number,
  changedName: string,
}

export type Actions = 'Refresh' | 'Init';