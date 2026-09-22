import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../shared/theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-main-layout',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,

    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule
  ],

  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  isMobile = false;

  sidenavMode: 'side' | 'over' = 'side';

  isSidenavOpened = true;

  constructor(public themeService: ThemeService) {}
  ngOnInit(): void {

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {

        this.isMobile = result.matches;

        if (this.isMobile) {
          this.sidenavMode = 'over';
          this.isSidenavOpened = false;
        } else {
          this.sidenavMode = 'side';
          this.isSidenavOpened = true;
        }

      });

  }


  closeSidenavOnMobile(): void {

    if (this.isMobile) {
      this.isSidenavOpened = false;
    }

  }

  openCloseSidenav(): void {
    
    this.isSidenavOpened = !this.isSidenavOpened;

  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}