import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { deleteTrend } from '../store/actions/trends-api.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail-component.html',
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
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);
  menuState: string = 'out';
  isToUpdate: boolean = true;

  constructor(private store: Store, private router: Router) { }

  handleNav() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  delete(id: any) {
    this.store.dispatch(deleteTrend({ id }));
    this.router.navigate(['/trends'])
  }
}
