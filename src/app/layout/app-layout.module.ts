import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

import { CustomBreakpointObserver } from './custom-breakpoint-observer';

@NgModule({
  imports: [LayoutModule],
  providers: [CustomBreakpointObserver],
})
export class AppLayoutModule {}
