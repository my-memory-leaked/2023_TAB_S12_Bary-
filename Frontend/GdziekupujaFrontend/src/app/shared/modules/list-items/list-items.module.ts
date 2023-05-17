import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListItemsComponent } from './list-items.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ListItemsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ListItemsComponent,
  ],
})
export class ListItemsModule { }
