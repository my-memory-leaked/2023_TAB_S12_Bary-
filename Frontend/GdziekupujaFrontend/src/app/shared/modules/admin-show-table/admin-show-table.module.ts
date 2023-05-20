import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastMessageModule } from '@shared/modules/toast-message/toast-message.module';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { AdminShowTableComponent } from './admin-show-table.component';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginator } from './custom-paginator-configuration.component';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AdminShowTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ToastMessageModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
  ],
  exports: [
    AdminShowTableComponent,
  ],
  providers: [
    AdminSubmitFormService,
    AdminStorageService,
    {
      provide: MatPaginatorIntl,
      useValue: CustomPaginator(),
    }
  ],
})
export class AdminShowTableModule { }
