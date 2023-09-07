import { SharedModule } from "src/app/shared/shared.module";
import { TrendSidebarComponent } from "./trend-sidebar.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    TrendSidebarComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TrendSidebarComponent
  ]
})
export class TrendSideBarModule {}
