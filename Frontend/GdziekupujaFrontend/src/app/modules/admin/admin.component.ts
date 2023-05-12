import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.adminStorageService.onInit();
  }

  returnButton() {
    this.router.navigateByUrl('/home');
  }
}