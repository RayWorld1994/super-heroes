import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  faFilter,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortNumericDown,
  faSortNumericDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { SlideInOut } from 'src/app/modules/shared/animation/slideInOut';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sort-story',
  templateUrl: './sort-story.component.html',
  styleUrls: ['./sort-story.component.scss'],
  animations: [SlideInOut],
})
export class SortStoryComponent implements OnInit {
  faSortAmountDown = faSortAmountDown;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faSortNumericDown = faSortNumericDown;
  faSortNumericDownAlt = faSortNumericDownAlt;
  faFilter = faFilter;

  filterActivated = false;
  isFiltered!: boolean;

  sortControl = new FormControl('');

  mapSubscription = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setSort();
    this.dispatchSortComic();
    this.getIsFilter();
  }

  setSort() {
    this.store
      .select(storySelectors.getOrderStory)
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
          storyActions.filterStories({ filter: { orderBy: sortValue } })
        )
      );
  }

  toggleFilter() {
    this.filterActivated = !this.filterActivated;
    if (!this.filterActivated && this.isFiltered) {
      this.store.dispatch(storyActions.cancelFilterStory());
      this.store.dispatch(storyActions.getStories());
    }
  }

  getIsFilter() {
    this.store
      .select(storySelectors.getIsFiltered)
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
