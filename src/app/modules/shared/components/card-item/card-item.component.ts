import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/modules/core/interfaces/character/character.interface';
import { Comic } from 'src/app/modules/core/interfaces/comic/comic.interface';
import { ESizeThumbnail } from '../../utils/size-thumbnail.enum';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() element!: Character | Comic;
  title!: string;

  size: string = ESizeThumbnail.standard_xlarge;

  constructor() {}

  ngOnInit(): void {
    'name' in this.element
      ? (this.title = this.element.name)
      : (this.title = this.element.title);
  }
}
