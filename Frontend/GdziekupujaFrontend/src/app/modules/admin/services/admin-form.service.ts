import { FormGroup } from '@angular/forms';

export abstract class AdminFormService {

  abstract adminForm(): FormGroup;
}
