import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';

@Component({
  selector: 'app-filter-story',
  templateUrl: './filter-story.component.html',
  styleUrls: ['./filter-story.component.scss'],
})
export class FilterStoryComponent implements OnInit {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      modifiedSince: [''],
    });
  }

  onReset() {
    this.filterForm.reset();
  }

  onSubmit() {
    const dateInput = this.filterForm.get('modifiedSince')?.value;
    this.store.dispatch(
      storyActions.filterStories({
        filter: {
          ...this.filterForm.value,
          modifiedSince: new Date(dateInput),
        },
      })
    );
  }
}
