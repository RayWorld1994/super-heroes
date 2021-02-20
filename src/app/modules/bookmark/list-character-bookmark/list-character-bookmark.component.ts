import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import * as characterSelectors from 'src/app/modules/core/store/selectors/character.selector';
import { Character } from '../../core/interfaces/character/character.interface';

@Component({
  selector: 'app-list-character-bookmark',
  templateUrl: './list-character-bookmark.component.html',
  styleUrls: ['./list-character-bookmark.component.scss'],
})
export class ListCharacterBookmarkComponent implements OnInit {
  characters: Observable<Character[]> = this.store.select(characterSelectors.getCharactersBookmarks);

  constructor(private store: Store) {}

  ngOnInit(): void {

  }
}
