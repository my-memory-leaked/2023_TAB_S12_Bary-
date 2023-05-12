import { Injectable, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminFormService } from '@modules/admin/services/admin-form.service';

@Injectable()
export class CategoryService extends AdminFormService {
  constructor(
    @Optional() private formBuilder: FormBuilder,
  ) {
    super();
  }

  adminForm(): FormGroup {
    return this.formBuilder.group({
    });
  }
}
