import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const defaultList = [
  {innerText: 'Login', link: '/login', clickFunction: ''},
  {innerText: 'Sign up', link: '/signup', clickFunction: ''}
];

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  private navList = new BehaviorSubject(defaultList);

  constructor( private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        switch (event.url) {
          case '/home':
            this.navList.next([
              {innerText: 'Logout', link: '/login', clickFunction: 'logout()'}
            ]);
            break;
          default:
            this.navList.next(defaultList);
            break;
        }
      }
    });
  }

  getNavList() {
    return this.navList;
  }
}
