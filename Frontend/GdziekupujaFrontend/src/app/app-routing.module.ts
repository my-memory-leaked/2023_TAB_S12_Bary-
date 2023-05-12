import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesPath } from '@core/enums/routes-path.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesPath.HOME,
    pathMatch: 'full'
  },
  {
    path: RoutesPath.HOME,
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: RoutesPath.HOME,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: "reload",
    anchorScrolling: "enabled",
    scrollOffset: [0, 150]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
