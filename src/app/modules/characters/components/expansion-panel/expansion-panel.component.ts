import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListByCharacter } from '../../interfaces/listByCharacter.interface';
import * as characterSelectors from 'src/app/modules/core/store/selectors/character.selector';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
  @Input() lists!: ListByCharacter[];

  constructor() {}

  ngOnInit(): void {}
}
