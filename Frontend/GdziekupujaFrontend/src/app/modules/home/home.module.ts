import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from '@modules/home/home.component';
import { OffersModule } from '@modules/offers/offers.module';
import { TopMenuModule } from '@modules/top-menu/top-menu.module';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    OffersModule,
    MatIconModule,
    TopMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class HomeModule { }
