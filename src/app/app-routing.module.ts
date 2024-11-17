import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/month', pathMatch: 'full' }, // Redirect to the default view
  { path: 'month', loadChildren: () => import('./components/month-view/month-view.module').then(m => m.MonthViewRoutingModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }