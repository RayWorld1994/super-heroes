import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  faFilter,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSortNumericDown,
  faSortNumericDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { SlideInOut } from 'src/app/modules/shared/animation/slideInOut';

@Component({
  selector: 'app-sort-story',
  templateUrl: './sort-story.component.html',
  styleUrls: ['./sort-story.component.scss'],
  animations: [SlideInOut]
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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setSort();
    this.dispatchSortComic();
    this.getIsFilter();
  }

  setSort() {
    this.store
      .select(storySelectors.getOrderStory)
      .subscribe((sortValue) =>
        this.sortControl.setValue(sortValue, { emitEvent: false })
      );
  }

  dispatchSortComic() {
    this.sortControl.valueChanges.subscribe((sortValue) =>
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
    console.log(this.isFiltered);
  }

  getIsFilter() {
    this.store
      .select(storySelectors.getIsFiltered)
      .subscribe((filter) => (this.isFiltered = filter));
  }

  get buttonFilterState() {
    return this.filterActivated
      ? { color: 'warn', icon: 'close' }
      : { color: 'accent', icon: 'search' };
  }
}
