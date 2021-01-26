import { Component, Input, OnInit } from '@angular/core';
import { ListByCharacter } from 'src/app/modules/characters/interfaces/listByCharacter.interface';

@Component({
  selector: 'app-expansion-panel-list',
  templateUrl: './expansion-panel-list.component.html',
  styleUrls: ['./expansion-panel-list.component.scss'],
})
export class ExpansionPanelListComponent implements OnInit {
  @Input() lists!: ListByCharacter[];

  constructor() {}

  ngOnInit(): void {}
}
