import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import { TrendService } from '../../trend.service';
import { Trend } from '../../models/trend.model';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  sendTrend$ = createEffect(() => this.actions$.pipe(
    ofType(TrendsApiActions.sendTrend),
    switchMap((body) =>
      this.trendService.createTrend(body.trend).pipe(
        map((trend) => TrendsApiActions.sendTrend({ trend })),
        catchError(() => of(TrendsApiActions.loadTrendsError()))
      )
    )
  ), { dispatch: false });

  constructor(private actions$: Actions, private trendService: TrendService) { }
}
