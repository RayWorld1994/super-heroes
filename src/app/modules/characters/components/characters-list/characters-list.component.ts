import { EOrderBy } from './../../../core/utils/eorder-by.enum';
import { Subject } from 'rxjs';
import { Character } from '../../../core/interfaces/character/character.interface';
import { CharacterService } from '../../services/character.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as characterSelectors from '../../../core/store/selectors/character.selector';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Event } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  @ViewChild('container') divContainer!: ElementRef<HTMLDivElement>;
  characters: Character[] = [];
  mapSubscription = new Subject();
  icon!: IconDefinition;

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.store.dispatch(characterAction.getCharacters());
    this.store
      .select(characterSelectors.getCharacterOnScreen).pipe(takeUntil(this.mapSubscription))
      .subscribe((characters) => {
        this.characters = characters;
      });
    this.scrollEvent();
    this.getSort();
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
          order === EOrderBy.OrderAtoZ ? faSortAlphaDown : faSortAlphaUp;
      });
  }

  sort() {
    this.store.dispatch(characterAction.filterByOrder());
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
