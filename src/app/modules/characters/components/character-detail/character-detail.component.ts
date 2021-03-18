import { concatMap, takeUntil, tap } from 'rxjs/operators';
import { ESizeThumbnail } from '../../../shared/utils/size-thumbnail.enum';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../../core/interfaces/character/character.interface';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import * as characterSelectors from 'src/app/modules/core/store/selectors/character.selector';
import { ListByCharacter } from '../../interfaces/listByCharacter.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  MapSubscribe = new Subject<void>();
  listsByCharacter!: ListByCharacter[];
  bookmark: boolean = false;

  character!: Character | undefined;

  size = ESizeThumbnail.detail;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(
        characterAction.characterSelected({
          id: Number(params.get('id_character')),
        })
      );
    });

    this.store
      .select(characterSelectors.getlistByCharacter)
      .pipe(takeUntil(this.MapSubscribe))
      .subscribe((lists) => {
        this.listsByCharacter = lists;
      });
    this.getCharacter();
  }

  getCharacter() {
    this.store
      .select(characterSelectors.getCurrentCharacter)
      .pipe(
        tap((character) => {
          this.character = character;
        }),
        concatMap(() => {
          return this.store.select(characterSelectors.getIdsBookmarks);
        })
      )
      .subscribe((ids) => {
        this.bookmark = ids.some((id) => this.character?.id === id);
      });
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          characterAction.removeCharacterBookmark({
            id: Number(this.character?.id),
          })
        )
      : this.store.dispatch(
          characterAction.addCharacterBookmark({
            id: Number(this.character?.id),
          })
        );
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  ngOnDestroy(): void {
    this.MapSubscribe.next();
    this.MapSubscribe.unsubscribe();
  }
}
