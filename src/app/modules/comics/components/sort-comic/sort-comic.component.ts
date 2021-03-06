import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  faSortAlphaDown,
  faSortAlphaUpAlt,
  faSortNumericDown,
  faSortNumericDownAlt,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';
import { SlideInOut } from 'src/app/modules/shared/animation/slideInOut';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sort-comic',
  templateUrl: './sort-comic.component.html',
  styleUrls: ['./sort-comic.component.scss'],
  animations: [SlideInOut],
})
export class SortComicComponent implements OnInit {
  faSortAlphaDown = faSortAlphaDown;
  faSortAlphaUpAlt = faSortAlphaUpAlt;
  faSortNumericDown = faSortNumericDown;
  faSortNumericDownAlt = faSortNumericDownAlt;
  faFilter = faFilter;
  mapSubscription = new Subject();

  filterActivated = false;
  isFiltered!: boolean;

  sortControl = new FormControl('');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setSort();
    this.dispatchSortComic();
    this.getIsFilter();
  }

  setSort() {
    this.store
      .select(comicSelectors.getOrderComic)
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((sortValue) =>
        this.sortControl.setValue(sortValue, { emitEvent: false })
      );
  }

  dispatchSortComic() {
    this.sortControl.valueChanges
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((sortValue) =>
        this.store.dispatch(
          comicActions.filterComics({ filter: { orderBy: sortValue } })
        )
      );
  }

  toggleFilter() {
    this.filterActivated = !this.filterActivated;
    if (!this.filterActivated && this.isFiltered) {
      this.store.dispatch(comicActions.cancelFilterComic());
      this.store.dispatch(comicActions.getComics());
    }
  }

  getIsFilter() {
    this.store
      .select(comicSelectors.getIsFiltered)
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((filter) => (this.isFiltered = filter));
  }

  get buttonFilterState() {
    return this.filterActivated
      ? { color: 'warn', icon: 'close' }
      : { color: 'accent', icon: 'search' };
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
