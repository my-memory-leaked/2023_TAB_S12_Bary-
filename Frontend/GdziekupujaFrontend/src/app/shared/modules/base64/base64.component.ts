import { Component, ElementRef, EventEmitter, HostListener, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base64Service } from './base64.service';
import { filter, tap } from 'rxjs';

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
export class Base64Component implements ControlValueAccessor, OnInit {

  onChange = (file: string) => { };

  public file: string | null = null;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private base64Service: Base64Service,
  ) { }

  ngOnInit(): void {
    this.base64Service.getDeleteImage().pipe(
      filter((res) => !!res),
    ).subscribe(() => this.deleteImage());
  }

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
