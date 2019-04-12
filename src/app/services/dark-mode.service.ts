import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private htmlTag: HTMLElement;
  private _darkModeEnabled: boolean;

  constructor() {
    this.htmlTag = document.documentElement;
    this._darkModeEnabled = false;
  }

  get darkModeEnabled() {
    return this._darkModeEnabled;
  }

  set darkModeEnabled(param: boolean) {
    this._darkModeEnabled = param;
  }

  private addTransition() {
    this.htmlTag.classList.add('transition');
    window.setTimeout(() => {
      this.htmlTag.classList.remove('transition');
    }, 500);
  }

  switchColorMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.addTransition();
    this.darkModeEnabled
    ? this.htmlTag.setAttribute('data-theme', 'dark')
    : this.htmlTag.setAttribute('data-theme', 'light');
  }
}
