import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkLayoutComponent } from './bookmark-layout/bookmark-layout.component';

const routes: Routes = [{ path: '', component: BookmarkLayoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarkRoutingModule {}
