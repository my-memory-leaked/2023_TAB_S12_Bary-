import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  admin = false;
  favouritesId = 0;
  refreshTrigger = 0;

  constructor(
    private router: Router,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit() {
    this.admin = this.myLocalStorageService.isServiceAdmin();
  }

  onAdminButtonClick(): void {
    this.router.navigateByUrl(`${RoutesPath.HOME}/${RoutesPath.ADMIN_PANEL}`);
  }
}
