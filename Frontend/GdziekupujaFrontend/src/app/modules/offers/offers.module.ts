import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersService } from '@modules/offers/api/offers.service';
import { OffersComponent } from '@modules/offers/offers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';
import { SharedModule } from '@shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdditionalInfoDialogComponent } from './components/additional-info-dialog/additional-info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    OffersComponent,
    AdditionalInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MyInputModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    OffersComponent,
  ],
  providers: [
    OffersService,
  ],
})
export class OffersModule { }
