import { Inject } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { USERNAME_PATTERN } from '@core/constants/validation-patterns.conts';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@core/constants/validation-patterns.conts';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  login = true;

  filteredCounties: string[];

  hiddenPassword = true;
  passwordMode = 'password';

  registerValid = false;
  loginValid = false;

  constructor(
    private fb: FormBuilder,
    private topMenuService: TopMenuService,
    private toastMessageService: ToastMessageService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private myLocalStorageService: MyLocalStorageService,
    @Inject(MAT_DIALOG_DATA) public counties: idNameOnly[],
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
    });
    this.registerForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(USERNAME_PATTERN)])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
      confirmedPassword: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
    });

    this.filteredCounties = this.counties.map((result) => result.name);

    this.registerForm.valueChanges.subscribe((res) => {
      if (res.password === res.confirmedPassword) {
        this.registerForm.get('confirmedPassword').setErrors(null)
        this.registerForm.setErrors(null)
      }
      else {
        this.registerForm.get('confirmedPassword').setErrors({ 'incorrect': true })
        this.registerForm.setErrors({ 'incorrect': true })
      }

      this.registerValid = this.registerForm.valid;
    })

    this.loginForm.valueChanges.subscribe(() => {
      this.loginValid = this.loginForm.valid;
    })
  }

  change(): void {
    this.login = !this.login;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  handleFormSubmit() {
    if (this.login) {
      if (this.loginForm.valid) {
        this.topMenuService.loginUser(this.loginForm.value).subscribe((res) => {
          this.myLocalStorageService.setStorage(res)
          this.dialogRef.close();
          this.refresh();
        })
      }
      return;
    }

    if (this.registerForm.valid) {
      this.topMenuService.registerUser(this.registerForm.value).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Rejestracja powiodła się! Teraz możesz się zalogować')
        this.change();
      })
    }
  }

  togglePasswordVisibility(): void {
    this.hiddenPassword = !this.hiddenPassword;
    this.passwordMode = this.hiddenPassword ? 'password' : '';
  }

  private refresh() {
    setTimeout(() => window.location.reload(), 10);
  }
}