import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  selectedOption: string = 'month'; 

  constructor(private sharedService: SharedService, private router: Router) {}

  currentMonth = this.sharedService.currentMonth;

  callPreviousMonthFromHeader() {
    this.sharedService.previousMonth();
  }
  callNextMonthFromHeader() {
    this.sharedService.nextMonth();
  }
  callSwitchToMonthFromHeader() {
    this.sharedService.switchToMonthView();
  }
  callSwitchToDayFromHeader() {
    this.sharedService.switchToDayView();
  }
  callSwitchToYearFromHeader() {
    this.sharedService.switchToYearView();
  }
  callSwitchToWeekFromHeader() {
    this.sharedService.switchToWeekView();
  }


  

}
