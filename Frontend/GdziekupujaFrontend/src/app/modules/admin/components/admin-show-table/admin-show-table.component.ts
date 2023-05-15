import { Api } from '@core/enums/api.enum';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { Actions } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { Category, Product, ProductInstance, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
  selector: 'app-admin-show-table',
  templateUrl: './admin-show-table.component.html',
  styleUrls: ['./admin-show-table.component.scss']
})
export class AdminShowTableComponent implements OnInit {

  @Input() operationText: DropDownText;
  @Input() set action(value: AllAdminActionsType) {
    if (value) {
      this.getData('Refresh');
      if (value === 'AddCategory') {
        this.toastMessageService.notifyOfSuccess("Dodano nową kategorię");
      }
      else if (value === 'ModifyCategory') {
        this.toastMessageService.notifyOfSuccess("Zaktualizowano kategorię");
      }
      else if (value === 'AddOffer') {
        this.toastMessageService.notifyOfSuccess("Dodano nową ofertę");
      }
      else if (value === 'ModifyOffer') {
        this.toastMessageService.notifyOfSuccess("Zaktualizowano ofertę");
      }
      else if (value === 'AddProduct') {
        this.toastMessageService.notifyOfSuccess("Dodano nowy produkt");
      }
      else if (value === 'ModifyProduct') {
        this.toastMessageService.notifyOfSuccess("Zaktualizowano produkt");
      }
      else if (value === 'AddSalesPoint') {
        this.toastMessageService.notifyOfSuccess("Dodano nowy punkt sprzedaży");
      }
      else if (value === 'ModifySalesPoint') {
        this.toastMessageService.notifyOfSuccess("Zaktualizowano punkt sprzedaży");
      }
      else if (value === 'BanUser') {
        this.toastMessageService.notifyOfSuccess("Zbanowano użytkownika");//do ofert i komentowania
      }
      else if (value === 'UnbanUser') {
        this.toastMessageService.notifyOfSuccess("Odbanowano użytkownika");//do ofert i komentowania
      }

      this.emitClear.emit();
    }
  }

  @Output() emitClear = new EventEmitter();

  @ViewChild(MatTable) table: MatTable<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  data: any[] = [];
  tempData: any[];
  dataSource: MatTableDataSource<any[]>;
  deleteApi: Api;

  constructor(
    private adminStorageService: AdminStorageService,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.getData('Init');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(event: any) {
    if (event?.id) {
      this.adminStorageService.deleteData(event?.id, this.deleteApi).subscribe(() => {
        this.getData('Refresh');
        this.toastMessageService.notifyOfSuccess("Usuwanie powiodło się");
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getData(action: Actions): void {
    if (action === 'Init') {
      switch (this.operationText) {
        case 'Kategoria': {
          this.adminStorageService.getDataForTable(this.operationText).subscribe((res: Category[]) => this.tempData = res);
          this.tempData.map((res: Category) => {
            this.data.push({
              id: res.id,
              categoryName: res.name,
              parentId: res.parentId,
            })
          });

          this.displayedColumns = ['id', 'categoryName', 'parentId', 'delete'];
          this.deleteApi = Api.CATEGORY_ID;
          break;
        }
        case 'Punkt sprzedaży': {
          this.adminStorageService.getDataForTable(this.operationText).subscribe((res: SalesPoint[]) => this.tempData = res);
          this.tempData.map((res: SalesPoint) => {
            this.data.push({
              id: res.id,
              salesPointName: res.name,
              addressCity: res.address.city,
              addressStreet: res.address.street,
              addressNumber: res.address.number,
              countyName: res.address.county.name,
            })
          });

          this.displayedColumns = ['id', 'salesPointName', 'addressCity', 'addressStreet', 'addressNumber', 'countyName', 'delete'];
          this.deleteApi = Api.SALES_POINT_ID;
          break;
        }
        case 'Produkt': {
          this.adminStorageService.getDataForTable(this.operationText).subscribe((res: Product[]) => this.tempData = res);
          this.tempData.map((res: Product) => {
            const formattedData = JSON.stringify(res.availableProps).replaceAll(/[{["}]/g, '')
              .replaceAll(/[,]/g, ', ')
              .replaceAll(':', ': ')
              .replaceAll('],', ' |')
              .replaceAll(']', '');

            this.data.push({
              id: res.id,
              productName: res.name,
              availableProps: formattedData,
            })
          });

          this.displayedColumns = ['id', 'productName', 'availableProps', 'delete'];
          this.deleteApi = Api.PRODUCT_ID;
          break;
        }
        default: {
          break;
        }
      }
      this.dataSource = new MatTableDataSource(this.data);
    }
    else if (action === 'Refresh') {
      this.adminStorageService.getData(this.operationText).subscribe((result) => {
        this.data.splice(0);
        switch (this.operationText) {
          case 'Kategoria': {
            result.map((res: Category) => {
              this.data.push({
                id: res.id,
                categoryName: res.name,
                parentId: res.parentId,
              })
            });
            break;
          }
          case 'Punkt sprzedaży': {
            result.map((res: SalesPoint) => {
              this.data.push({
                id: res.id,
                salesPointName: res.name,
                addressCity: res.address.city,
                addressStreet: res.address.street,
                addressNumber: res.address.number,
                countyName: res.address.county.name,
              })
            });
            break;
          }
          case 'Produkt': {
            result.map((res: Product) => {
              const formattedData = JSON.stringify(res.availableProps).replaceAll(/[{["}]/g, '')
                .replaceAll(/[,]/g, ', ')
                .replaceAll(':', ': ')
                .replaceAll('],', ' |')
                .replaceAll(']', '');

              this.data.push({
                id: res.id,
                productName: res.name,
                availableProps: formattedData,
              })
            });
            break;
          }
          default: {
            break;
          }
        }
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.renderRows();
      });
    }
  }
}