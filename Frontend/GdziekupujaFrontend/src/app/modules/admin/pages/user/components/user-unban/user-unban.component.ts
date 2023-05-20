import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { UserFormHandlerService } from '../../services/user-form-handler.service';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';

@Component({
  selector: 'user-unban',
  templateUrl: './user-unban.component.html',
  styleUrls: ['./user-unban.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class UserUnbanComponent implements OnInit {
  
  form: FormGroup;
  users: UserInfo[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private userFormHandlerService: UserFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.userFormHandlerService.setFormGroupForUserUnban(this.form);

    this.adminStorageService.users$.asObservable().subscribe((res) => {
      res.map((result) => {
        if (!result.canComment) {
          this.users.push(result)
        }
      });
    });
  }
}