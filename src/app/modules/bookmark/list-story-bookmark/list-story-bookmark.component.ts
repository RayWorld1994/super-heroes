import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import { Observable } from 'rxjs';
import { Story } from '../../core/interfaces/story/story.interface';

@Component({
  selector: 'app-list-story-bookmark',
  templateUrl: './list-story-bookmark.component.html',
  styleUrls: ['./list-story-bookmark.component.scss'],
})
export class ListStoryBookmarkComponent implements OnInit {
  stories: Observable<Story[]> = this.store.select(
    storySelectors.getStoriesBookmarks
  );
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
