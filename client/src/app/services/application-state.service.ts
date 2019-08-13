import { Injectable } from '@angular/core';

/*
 * medium article: https://medium.com/better-programming/creating-angular-webapp-for-multiple-views-and-screen-sizes-50fe8a83c433
 */
@Injectable()
export class ApplicationStateService {

  private isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 576) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
