import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comic } from '../../core/interfaces/comic/comic.interface';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-comic-bookmark',
  templateUrl: './list-comic-bookmark.component.html',
  styleUrls: ['./list-comic-bookmark.component.scss'],
})
export class ListComicBookmarkComponent implements OnInit {
  comics: Observable<Comic[]> = this.store.select(
    comicSelectors.getComicsBookmarks
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
