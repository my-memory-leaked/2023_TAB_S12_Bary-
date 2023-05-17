import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { OfferContent, idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LoginDialogComponent } from '@modules/top-menu/components/login-dialog/login-dialog.component';
import { Categories } from '@modules/offers/interfaces/offers.interface';
import { Observable } from 'rxjs';
import { AddOfferDialogComponent } from './components/add-offer-dialog/add-offer-dialog.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent implements OnInit {

  @Output() refreshOffers = new EventEmitter<OfferContent>();
  @Output() getFavourites = new EventEmitter();
  @Output() justRefreshOffers = new EventEmitter();

  counties: idNameOnly[] = [];
  categories$: Observable<Categories[]>;
  categories: Categories[] = [];
  form: FormGroup;
  userName = '';
  userEmail = '';
  userCounty = '';
  userProfileCounty = '';

  filteredCounties: string[];
  filteredCategories: string[];

  showUserInfo = false;
  logged: boolean;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private topMenuService: TopMenuService,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      product: [null],
      category: [null],
      county: [null],
    });

    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');

    this.topMenuService.getAllCounties().subscribe((res) => {
      if (res) {
        this.counties = res;
        this.userCounty = this.counties.find((result) => result.id.toString() === localStorage.getItem('userCountyId'))?.name;

        if (!this.userCounty) {
          this.userCounty = '';
        }
      }
    })

    this.categories$ = this.topMenuService.getAllCategories();

    this.logged = this.myLocalStorageService.isLogged();
  }

  handleDropdownChange(chosenCategory: Categories): void {
    this.form.get('category').setValue(chosenCategory.id)
  }

  selectedCounty(): void {
    localStorage.setItem('userCountyId', this.counties.find((res) => res.name === this.form.get('county').value)?.id.toString());
  }

  search() {
    this.refreshOffers.emit({
      search: this.form.get('product').value,
      category: this.form.get('category').value,
    })
  }

  emitFavourites() {
    this.getFavourites.emit();
  }

  reload() {
    window.location.reload();
  }

  logIn() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      height: '650px',
      panelClass: 'loginDialog',
      data: this.counties,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'logged') {
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
      }
    });
  }

  logout() {
    this.myLocalStorageService.removeStorage();
    this.logged = false;
    this.reload();
  }

  addOffer() {
    const dialogRef = this.dialog.open(AddOfferDialogComponent, {
      width: '800px',
      height: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'refresh') {
        this.justRefreshOffers.emit();
      }
    });
  }
}