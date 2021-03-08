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
  faSortAlphaUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { zoomIn } from 'src/app/modules/shared/animation/zoomIn';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  animations: [
    trigger('filter', [
      transition(':enter', [
        style({ height: 0 }),
        animate('200ms ease-out', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate('200ms ease-in-out', style({ height: '0px' })),
      ]),
    ]),
    zoomIn,
  ],
})
export class CharactersListComponent implements OnInit {
  @ViewChild('container') divContainer!: ElementRef<HTMLDivElement>;
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

  upToTop() {
    this.scrollDispatcher
      .getAncestorScrollContainers(this.divContainer)[0]
      .scrollTo({ top: 0, behavior: 'smooth' });
  }

  getSort() {
    return this.store
      .select(characterSelectors.getOrderCharacter)
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

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }

  get onButtonSearchState() {
    return this.searchActivated
      ? { color: 'warn', icon: 'close' }
      : { color: 'accent', icon: 'search' };
  }
}
