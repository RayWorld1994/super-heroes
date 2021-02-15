import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ESizeThumbnail } from './../../../shared/utils/size-thumbnail.enum';
import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {
  size = ESizeThumbnail.detail;
  comic$ = this.store.select(
    comicSelectors.getCurrentComic
  ) as Observable<Comic>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(
        comicActions.comicSelected({ id: Number(params.get('id_comic')) })
      );
    });
  }
}
