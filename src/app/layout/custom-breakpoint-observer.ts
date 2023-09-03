import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomBreakpointState } from './custom-breakpoint-state.model';
import { CustomBreakpoints } from './custom-breakpoints';

@Injectable()
export class CustomBreakpointObserver {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get breakpointState$(): Observable<CustomBreakpointState> {
    return this.breakpointObserver
      .observe([
        CustomBreakpoints.Small,
        CustomBreakpoints.Medium,
        CustomBreakpoints.Large,
      ])
      .pipe(
        map(({ breakpoints }) => ({
          isSmall: breakpoints[CustomBreakpoints.Small],
          isMedium: breakpoints[CustomBreakpoints.Medium],
          isLarge: breakpoints[CustomBreakpoints.Large],
        }))
      );
  }

  get isSmall$(): Observable<boolean> {
    return this.breakpointState$.pipe(map(({ isSmall }) => isSmall));
  }

  get isMedium$(): Observable<boolean> {
    return this.breakpointState$.pipe(map(({ isMedium }) => isMedium));
  }

  get isLarge$(): Observable<boolean> {
    return this.breakpointState$.pipe(map(({ isLarge }) => isLarge));
  }
}
