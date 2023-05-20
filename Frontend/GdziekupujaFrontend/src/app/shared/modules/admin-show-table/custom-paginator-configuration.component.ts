import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Pozycji na stronie:';
  customPaginatorIntl.firstPageLabel = 'Pierwsza strona';
  customPaginatorIntl.lastPageLabel = 'Ostatnia strona';
  customPaginatorIntl.nextPageLabel = 'Następna strona';
  customPaginatorIntl.previousPageLabel = 'Ostatnia strona';

  return customPaginatorIntl;
}