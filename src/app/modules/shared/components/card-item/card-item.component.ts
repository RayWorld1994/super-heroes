import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/modules/core/interfaces/character/character.interface';
import { SizeThumbnail } from '../../utils/size-thumbnail.enum';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() element!: Character;
  size: string = SizeThumbnail.standard_xlarge;

  constructor() { }

  ngOnInit(): void {
  }

}
