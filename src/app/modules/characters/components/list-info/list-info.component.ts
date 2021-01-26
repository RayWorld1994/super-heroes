import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../../core/interfaces/character/List.interfaces';

@Component({
  selector: 'app-list-info',
  templateUrl: './list-info.component.html',
  styleUrls: ['./list-info.component.scss'],
})
export class ListInfoComponent implements OnInit {
  @Input() dataList: List | undefined;
  constructor() {}

  ngOnInit(): void {
  }
}
