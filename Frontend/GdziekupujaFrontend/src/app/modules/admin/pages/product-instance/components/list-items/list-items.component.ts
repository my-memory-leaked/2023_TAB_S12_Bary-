import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categories } from '@modules/offers/interfaces/offers.interface';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {

  @Input() data: string;
  @Input() lineFixer: { index: number, array: any[] };
  @Output() delete = new EventEmitter<void>();

  deleteItem() {
    this.delete.emit();
  }
}
