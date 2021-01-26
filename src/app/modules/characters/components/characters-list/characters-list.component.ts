import { Character } from '../../../core/interfaces/character/character.interface';
import { CharacterService } from '../../services/character.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as characterSelectors from '../../../core/store/selectors/character.selector';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Event } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  cdkScrollable!: CdkScrollable;

  characters: Character[] = [];

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.store.dispatch(characterAction.getCharacters());
    this.store
      .select(characterSelectors.getCharacterOnScreen)
      .subscribe((characters) => {
        this.characters = characters;
      });
    this.scrollEvent();
  }

  scrollEvent() {
    return this.scrollDispatcher.scrolled().subscribe((cdkScroll) => {
      if (cdkScroll) {
        const target = cdkScroll.getElementRef().nativeElement;
        if (target.scrollTop + target.clientHeight === target.scrollHeight) {
          this.store.dispatch(characterAction.getMoreCharacters());
        }
      }
    });
  }
}
