import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LzNestedDropdownComponent } from './lz-nested-dropdown.component';
import { NestedDropdownService } from './services/nested-dropdown.service';
import { DropdownItemCategoriesComponent } from './components/dropdown-item-categories/dropdown-item-categories.component';

@NgModule({
  declarations: [
    LzNestedDropdownComponent,
    DropdownItemCategoriesComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
  ],
  exports: [
    LzNestedDropdownComponent,
  ],
  providers: [
    NestedDropdownService,
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'shared/modules/lz-nested-dropdown',
        alias: "dropdown",
      },
      multi: true,
    },
  ]
})
export class LzNestedDropdownModule { }
