import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';
import { CategoryComponent } from '@modules/admin/pages/category/category.component';
import { SalesPointComponent } from '@modules/admin/pages/sales-point/sales-point.component';
import { CategoryFormHandlerService } from '@modules/admin/pages/category/services/category-form-handler.service';
import { CategoryAddComponent } from '@modules/admin/pages/category/components/category-add/category-add.component';
import { SalesPointFormHandlerService } from '@modules/admin/pages/sales-point/services/sales-point-form-handler.service';
import { CategoryModifyComponent } from '@modules/admin/pages/category/components/category-modify/category-modify.component';
import { SalesPointAddComponent } from '@modules/admin/pages/sales-point/components/sales-point-add/sales-point-add.component';
import { SalesPointModifyComponent } from '@modules/admin/pages/sales-point/components/sales-point-modify/sales-point-modify.component';
import { CategorySetActionComponent } from '@modules/admin/pages/category/components/category-set-action/category-set-action.component';
import { CategoryTypeSwitchComponent } from '@modules/admin/pages/category/components/category-type-switch/category-type-switch.component';
import { SalesPointSetActionComponent } from '@modules/admin/pages/sales-point/components/sales-point-set-action/sales-point-set-action.component';
import { SalesPointTypeSwitchComponent } from '@modules/admin/pages/sales-point/components/sales-point-type-switch/sales-point-type-switch.component';
import { ProductFormHandlerService } from './product/services/product-form-handler.service';
import { ProductAddComponent } from './product/components/product-add/product-add.component';
import { ProductModifyComponent } from './product/components/product-modify/product-modify.component';
import { ProductSetActionComponent } from './product/components/product-set-action/product-set-action.component';
import { ProductTypeSwitchComponent } from './product/components/product-type-switch/product-type-switch.component';
import { ProductComponent } from './product/product.component';
import { ProductInstanceAddComponent } from './product-instance/components/product-instance-add/product-instance-add.component';
import { ProductInstanceModifyComponent } from './product-instance/components/product-instance-modify/product-instance-modify.component';
import { ProductInstanceSetActionComponent } from './product-instance/components/product-instance-set-action/product-instance-set-action.component';
import { ProductInstanceTypeSwitchComponent } from './product-instance/components/product-instance-type-switch/product-instance-type-switch.component';
import { ProductInstanceFormHandlerService } from './product-instance/services/product-instance-form-handler.service';
import { ProductInstanceComponent } from './product-instance/product-instance.component';
import { Base64Component } from './product-instance/components/base64/base64.component';
import { LzNestedDropdownModule } from '@shared/modules/lz-nested-dropdown/lz-nested-dropdown.module';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { ListItemsComponent } from './product-instance/components/list-items/list-items.component';

@NgModule({
  declarations: [
    CategoryComponent,
    SalesPointComponent,
    CategoryAddComponent,
    SalesPointAddComponent,
    CategoryModifyComponent,
    SalesPointModifyComponent,
    CategorySetActionComponent,
    CategoryTypeSwitchComponent,
    SalesPointSetActionComponent,
    SalesPointTypeSwitchComponent,
    ProductComponent,
    ProductAddComponent,
    ProductModifyComponent,
    ProductSetActionComponent,
    ProductTypeSwitchComponent,
    // UserComponent,
    // UserBanComponent,
    // UserUnbanComponent,
    // UserSetActionComponent,
    // UserTypeSwitchComponent,
    // OfferComponent,
    // OfferAddComponent,
    // OfferModifyComponent,
    // OfferSetActionComponent,
    // OfferTypeSwitchComponent,
    Base64Component,
    ProductInstanceComponent,
    ProductInstanceAddComponent,
    ProductInstanceModifyComponent,
    ProductInstanceSetActionComponent,
    ProductInstanceTypeSwitchComponent,
    ListItemsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatIconModule,
    MyInputModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
    LzNestedDropdownModule,
  ],
  providers: [
    ProductFormHandlerService,
    CategoryFormHandlerService,
    SalesPointFormHandlerService,
    // UserFormHandlerService,
    // OfferFormHandlerService,
    ProductInstanceFormHandlerService,
    TopMenuService,
  ]
})
export class AdminPagesModule { }
