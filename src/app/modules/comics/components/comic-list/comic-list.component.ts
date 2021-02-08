import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { EOrderComicBy } from 'src/app/modules/core/utils/e-order-comic-by.enum';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
})
export class ComicListComponent implements OnInit {
  comics: Comic[] = [];
  mapSubscription = new Subject();
  icon!: IconDefinition;

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.store.dispatch(comicActions.getComics());
    this.store.select(comicSelectors.getComicOnScreen).subscribe((comics) => {
      this.comics = comics;
    });
    this.scrollEvent();
    this.getSort()
  }

  scrollEvent() {
    return this.scrollDispatcher
      .scrolled()
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((cdkScroll) => {
        if (cdkScroll) {
          const target = cdkScroll.getElementRef().nativeElement;
          if (target.scrollTop + target.clientHeight === target.scrollHeight) {
            this.store.dispatch(comicActions.getMoreComics());
          }
        }
      });
  }

  sort() {
    this.store.dispatch(comicActions.sortByTitle());
  }

  getSort() {
    return this.store
      .select(comicSelectors.getOrderByTitle)
      .subscribe((order) => {
        this.icon =
          order === EOrderComicBy.titleAtoZ ? faSortAlphaDown : faSortAlphaUp;
      });
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
