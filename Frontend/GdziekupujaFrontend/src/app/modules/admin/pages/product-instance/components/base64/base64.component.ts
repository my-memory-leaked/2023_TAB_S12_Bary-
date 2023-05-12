import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lz-base64',
  templateUrl: './base64.component.html',
  styleUrls: ['./base64.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Base64Component,
      multi: true
    }
  ],
})
export class Base64Component implements ControlValueAccessor {

  onChange = (file: string) => { };

  public file: string | null = null;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  @Output() emitImage = new EventEmitter<File>();

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList): void {
    const file = event && event.item(0);
    this.emitImage.emit(file);
    this.base64(file);
  }

  writeValue(value: null) {
    this.host.nativeElement.value = value;
    this.file = value;
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) { }

  private base64(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.file = reader.result as string;
        this.onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    this.file = null;
  }
}
