import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ESizeThumbnail } from './../../../shared/utils/size-thumbnail.enum';
import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';
import {
  concatMap,
  exhaustMap,
  mergeMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {
  size = ESizeThumbnail.detail;
  comic!: Comic | undefined;
  bookmark!: boolean;
  mapSubscription = new Subject();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(
        comicActions.comicSelected({ id: Number(params.get('id_comic')) })
      );
    });

    this.getComic();
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          comicActions.removeComicBookmark({
            id: Number(this.comic?.id),
          })
        )
      : this.store.dispatch(
          comicActions.addComicBookmark({
            id: Number(this.comic?.id),
          })
        );
  }

  getComic() {
    this.store
      .select(comicSelectors.getCurrentComic)
      .pipe(
        takeUntil(this.mapSubscription),
        tap((comic) => {
          this.comic = comic;
        }),
        concatMap(() => this.store.select(comicSelectors.getIdsBookmarks))
      )
      .subscribe((ids) => {
        this.bookmark = ids.some((id) => this.comic?.id === id);
      });
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
