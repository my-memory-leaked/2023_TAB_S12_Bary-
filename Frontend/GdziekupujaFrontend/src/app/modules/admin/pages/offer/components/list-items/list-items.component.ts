import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {

  @Input() data: string;
  @Input() set dataa(a: string){
    console.log(a)
  }
  @Input() lineFixer: { index: number, array: any[] };
  @Output() delete = new EventEmitter<void>();

  deleteItem() {
    this.delete.emit();
  }
}
