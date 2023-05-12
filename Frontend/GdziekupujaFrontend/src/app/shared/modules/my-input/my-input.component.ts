import { Nullable } from '@core/types/nullable';
import { InputmaskOptions } from '@ngneat/input-mask';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputMaskType, POSTCODE_MASK } from '@app/config/mask-input/mask-input.config';

@Component({
  selector: 'my-input',
  exportAs: 'input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class MyInputComponent {

  @ViewChild(MatFormFieldControl, { static: true }) control: MatFormFieldControl<string>;

  @Input() controlForm: AbstractControl;
  @Input() controlName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() maxLength = 524287;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() readonly = false;
  @Input() touchedPlaceholder = false;
  @Input() suffixTemplate: TemplateRef<Nullable<unknown>>;
  @Input() hint: TemplateRef<Nullable<unknown>>;
  @Input() suffixOutsideTemplate: TemplateRef<Nullable<unknown>>;
  @Input() hintAlign: 'end' | 'start' = 'end';
  @Input() optional = false;
  @Input() autocomplete: string;

  @Input() set mask(value: InputMaskType) {
    this._mask = this.setMask(value);
  }

  _mask: InputmaskOptions<unknown>;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  get getControl(): FormControl {
    if (this.controlForm) {
      return this.controlForm as FormControl;
    }
    return this.formGroupDirective.form.controls[this.controlName] as FormControl;
  }

  get visiblePlaceholder(): string {
    if (this.touchedPlaceholder)
      return this.placeholder;

    return this.placeholder;
  }

  setMask(value: InputMaskType): InputmaskOptions<unknown> {
    switch (value) {
      case 'post-code': return POSTCODE_MASK;
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
