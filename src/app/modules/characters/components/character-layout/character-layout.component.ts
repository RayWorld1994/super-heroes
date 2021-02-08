import { MatDialog } from '@angular/material/dialog';
import { ToggleSearchService } from './../../../shared/services/toggle-search.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as characterActions from 'src/app/modules/core/store/actions/character.action';
import { SearchCharacterComponent } from '../search-character/search-character.component';
@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.scss'],
})
export class CharacterLayoutComponent implements OnInit {
  constructor(
    private store: Store,
    private toggleSeachService: ToggleSearchService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.toggleSeachService.clickSub.subscribe(() => {
      this.matDialog.open(SearchCharacterComponent, { minWidth: '700px' });
    });
  }

  searchAction() {}
}
