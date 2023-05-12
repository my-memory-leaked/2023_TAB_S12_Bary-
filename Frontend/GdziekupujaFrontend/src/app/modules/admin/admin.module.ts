import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from '@modules/admin/admin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminRoutingModule } from '@modules/admin/admin-routing.module';
import { AdminPagesModule } from '@modules/admin/pages/admin-pages.module';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { AdminShowTableComponent } from '@modules/admin/components/admin-show-table/admin-show-table.component';
import { CustomPaginator } from '@modules/admin/components/admin-show-table/custom-paginator-configuration.component';
import { AdminOperationTypeComponent } from '@modules/admin/components/admin-operation-type/admin-operation-type.component';
import { AdminOperationDetailsComponent } from '@modules/admin/components/admin-operation-details/admin-operation-details.component';
import { LzNestedDropdownModule } from '@shared/modules/lz-nested-dropdown/lz-nested-dropdown.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminOperationDetailsComponent,
    AdminOperationTypeComponent,
    AdminShowTableComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AdminPagesModule,
    LzNestedDropdownModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    AdminSubmitFormService,
    {
      provide: MatPaginatorIntl,
      useValue: CustomPaginator(),
    }
  ],
})
export class AdminModule { }
