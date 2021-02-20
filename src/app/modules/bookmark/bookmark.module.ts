import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarkRoutingModule } from './bookmark-routing.module';
import { ListCharacterBookmarkComponent } from './list-character-bookmark/list-character-bookmark.component';
import { ListComicBookmarkComponent } from './list-comic-bookmark/list-comic-bookmark.component';
import { SharedModule } from '../shared/shared.module';
import { BookmarkLayoutComponent } from './bookmark-layout/bookmark-layout.component';


@NgModule({
  declarations: [ListCharacterBookmarkComponent, ListComicBookmarkComponent, BookmarkLayoutComponent],
  imports: [
    CommonModule,
    BookmarkRoutingModule,
    SharedModule
  ]
})
export class BookmarkModule { }
