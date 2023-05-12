import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersService } from '@modules/offers/api/offers.service';
import { OffersComponent } from '@modules/offers/offers.component';

@NgModule({
  declarations: [
    OffersComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    OffersService,
  ],
})
export class OffersModule { }
