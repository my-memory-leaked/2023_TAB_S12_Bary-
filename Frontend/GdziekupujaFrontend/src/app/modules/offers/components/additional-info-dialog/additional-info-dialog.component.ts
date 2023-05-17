import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-info-dialog',
  templateUrl: './additional-info-dialog.component.html',
  styleUrls: ['./additional-info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdditionalInfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public additionalInfo: { name: string, info: string[] },
  ) { }
}