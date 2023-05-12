import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { AppRoutingModule } from '@app/app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

export const customIcons: [string, string][] = [
  ["my-heart-red", "heart-red.svg"],
  ["my-heart-white", "heart-white.svg"],
  ["my-like-clicked", "like-clicked.svg"],
  ["my-dislike-clicked", "dislike-clicked.svg"],
  ["my-like-not-clicked", "like-not-clicked.svg"],
  ["my-dislike-not-clicked", "dislike-not-clicked.svg"],
  ["ziomek", "ziomek.svg"],
  ["location", "location.svg"],
  ["left", "left.svg"],
  ["right", "right.svg"],
  ["clock", "clock.svg"],
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    InputMaskModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    ToastMessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    customIcons.forEach(([iconName, icon]) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(`../assets/images/${icon}`),
      );
    });
  }
}
