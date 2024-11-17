// day-view-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthViewCalenderComponent } from './month-view-calender/month-view-calender.component';

const routes: Routes = [
  { path: '', component: MonthViewCalenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthViewRoutingModule { }
