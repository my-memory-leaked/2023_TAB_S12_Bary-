import { AbstractControl, FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abstractToGroup'
})
export class AbstractControlToFormGroupPipe implements PipeTransform {

  transform(value: AbstractControl): FormGroup {
    return value as FormGroup;
  }
}
