import { Store } from '@ngrx/store';
import * as characterAction from 'src/app/modules/core/store/actions/character.action';
import * as characterSelectors from 'src/app/modules/core/store/selectors/character.selector';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/modules/core/interfaces/character/character.interface';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import { ESizeThumbnail } from '../../utils/size-thumbnail.enum';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() element!: Character;
  title!: string;
  bookmark!: boolean;

  size: string = ESizeThumbnail.standard_xlarge;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(characterSelectors.getIdsBookmarks).subscribe((ids) => {
      this.bookmark = ids.some((id) => this.element.id === id);
    });
  }

  onSelectCharacter() {
    this.router.navigate([this.element.id], { relativeTo: this.route });
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          characterAction.removeCharacterBookmark({
            id: Number(this.element.id),
          })
        )
      : this.store.dispatch(
          characterAction.addCharacterBookmark({ id: Number(this.element.id) })
        );
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  bookmarkComic(){
    this.bookmark
      ? this.store.dispatch(
          characterAction.removeCharacterBookmark({
            id: Number(this.element.id),
          })
        )
      : this.store.dispatch(
          characterAction.addCharacterBookmark({ id: Number(this.element.id) })
        );
  }
}
