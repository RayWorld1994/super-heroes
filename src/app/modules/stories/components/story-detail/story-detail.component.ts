import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from 'src/app/modules/core/interfaces/story/story.interface';
import { ESizeThumbnail } from 'src/app/modules/shared/utils/size-thumbnail.enum';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  size = ESizeThumbnail.detail;
  story$ = this.store.select(
    storySelectors.getCurrentStorie
  ) as Observable<Story>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(
        storyActions.storySelected({ id: Number(params.get('id_story')) })
      );
    });
  }
}
