import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Character } from 'src/app/modules/core/interfaces/character/character.interface';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';

import * as comicActions from 'src/app/modules/core/store/actions/comic.action';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import { ESizeThumbnail } from 'src/app/modules/shared/utils/size-thumbnail.enum';

@Component({
  selector: 'app-card-item-comic',
  templateUrl: './card-item-comic.component.html',
  styleUrls: ['./card-item-comic.component.scss'],
})
export class CardItemComicComponent implements OnInit {
  @Input() comic!: Comic;
  bookmark!: boolean;

  size: string = ESizeThumbnail.standard_xlarge;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(comicSelectors.getIdsBookmarks).subscribe((ids) => {
      this.bookmark = ids.some((id) => this.comic.id === id);
    });

    console.log(this.bookmark);
  }

  onSelectComic() {
    this.router.navigate([this.comic.id], { relativeTo: this.route });
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          comicActions.removeComicBookmark({
            id: Number(this.comic.id),
          })
        )
      : this.store.dispatch(
          comicActions.addComicBookmark({ id: Number(this.comic.id) })
        );
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  bookmarkComic() {
    this.bookmark
      ? this.store.dispatch(
          comicActions.removeComicBookmark({
            id: Number(this.comic.id),
          })
        )
      : this.store.dispatch(
          comicActions.addComicBookmark({ id: Number(this.comic.id) })
        );
  }
}
