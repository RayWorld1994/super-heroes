import { Character } from 'src/app/modules/core/interfaces/character/character.interface';
import { EOrderBy } from './../../../core/utils/eorder-by.enum';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as characterSelectors from '../../../core/store/selectors/character.selector';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { takeUntil } from 'rxjs/operators';
import {
  faSortAlphaDown,
  faSortAlphaDownAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { zoomIn } from 'src/app/modules/shared/animation/zoomIn';
import { SlideInOut } from 'src/app/modules/shared/animation/slideInOut';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  animations: [SlideInOut, zoomIn],
})
export class CharactersListComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;
  characters!: Observable<Character[]>;
  mapSubscription = new Subject();
  icon!: IconDefinition;
  searchActivated = false;
  isFiltered!: boolean;

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.dispatchGetCharacters();
    this.characters = <Observable<Character[]>>(
      this.store.select(characterSelectors.getCharacterOnScreen)
    );
    this.store
      .select(characterSelectors.getIsFiltered)
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((isFiltered) => (this.isFiltered = isFiltered));
    this.scrollEvent();
    this.getSort();
  }

  dispatchGetCharacters() {
    this.store.dispatch(characterAction.getCharacters());
  }

  scrollEvent() {
    return this.scrollDispatcher
      .scrolled()
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((cdkScroll) => {
        if (cdkScroll) {
          const target = cdkScroll.getElementRef().nativeElement;
          if (target.scrollTop + target.clientHeight === target.scrollHeight) {
            this.store.dispatch(characterAction.getMoreCharacters());
          }
        }
      });
  }

  getSort() {
    return this.store
      .select(characterSelectors.getOrderCharacter)
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((order) => {
        this.icon =
          order === EOrderBy.OrderAtoZ ? faSortAlphaDown : faSortAlphaDownAlt;
      });
  }

  sort() {
    this.store.dispatch(characterAction.filterByOrder());
  }

  onSearchToggle() {
    this.searchActivated = !this.searchActivated;
    if (!this.searchActivated && this.isFiltered) {
      this.store.dispatch(characterAction.cancelFilterCharacter());
      this.dispatchGetCharacters();
    }
  }

  get onButtonSearchState() {
    return this.searchActivated
    ? { color: 'warn', icon: 'close' }
    : { color: 'accent', icon: 'search' };
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
