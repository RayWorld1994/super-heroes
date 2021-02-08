import { takeUntil } from 'rxjs/operators';
import { ESizeThumbnail } from '../../../shared/utils/size-thumbnail.enum';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  character$: Observable<Character | undefined> = this.store
    .select(characterSelectors.getCurrentCharacter)
    .pipe(takeUntil(this.MapSubscribe));

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
  }

  ngOnDestroy(): void {
    this.MapSubscribe.next();
    this.MapSubscribe.unsubscribe();
  }
}
