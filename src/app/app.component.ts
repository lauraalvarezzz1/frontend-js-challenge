import { Component, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
    <app-progress-bar
      *ngIf="isLoading$ | async"
      class="app-progress-bar"
    ></app-progress-bar>
    <header class="app-header">
      <a routerLink="/">
        <img
          *ngIf="isSmallScreen$ | async"
          class="app-logo"
          src="assets/Logos/aTrendsPRO.svg"
          alt="Logo Avantio Trends PRO"
        />
      </a>
      <div class="app-current-date">
        <span>{{ currentDate | date: 'dd MMMM yyyy' }}</span>
      </div>
    </header>
    <nav class="app-navigation">
      <app-menu-small *ngIf="isSmallScreen$ | async"></app-menu-small>
      <app-menu-medium *ngIf="isMediumScreen$ | async"></app-menu-medium>
      <app-menu-large *ngIf="isLargeScreen$ | async"></app-menu-large>
    </nav>
    <main class="app-main-content">
      <router-outlet></router-outlet>
      <button type="button" class="trend__action" (click)="handleNav()">
        <img src="assets/Iconos/Actions/add.svg" alt="Agregar noticia" />
      </button>
      <app-trend-sidebar class="sidenav" 
        [@slideInOut]="menuState"
        (close)="handleNav()"></app-trend-sidebar>
    </main>
  `,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));
  menuState: string = 'out';

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private renderer: Renderer2,
  ) { }

  handleNav() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.menuState === 'in' ? this.renderer.addClass(document.body, 'overflow_hidden') : 
    this.renderer.removeClass(document.body, 'overflow_hidden');
  }
}
