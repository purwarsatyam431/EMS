import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDark = false;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadTheme();
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;

    if (this.isBrowser) {
      this.applyTheme();

      localStorage.setItem(
        'theme',
        this.isDark ? 'dark' : 'light'
      );
    }
  }

  isDarkMode(): boolean {
    return this.isDark;
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');

    this.isDark = savedTheme === 'dark';

    this.applyTheme();
  }

  private applyTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    document.documentElement.classList.toggle(
      'dark-theme',
      this.isDark
    );
  }
}