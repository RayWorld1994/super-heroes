import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import * as comicSelectors from 'src/app/modules/core/store/selectors/comic.selector';
import * as comicActions from 'src/app/modules/core/store/actions/comic.action';
import { faSortDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { zoomIn } from 'src/app/modules/shared/animation/zoomIn';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  animations: [zoomIn],
})
export class ComicListComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  comics: Observable<Comic[]> = this.store.select(
    comicSelectors.getComicOnScreen
  );
  mapSubscription = new Subject();
  icon: IconDefinition = faSortDown;

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.store.dispatch(comicActions.getComics());
    this.scrollEvent();
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

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
