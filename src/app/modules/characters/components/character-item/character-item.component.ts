import { ThumbnailService } from '../../../shared/services/thumbnail.service';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../../core/interfaces/character/character.interface';
import { SizeThumbnail } from '../../../shared/utils/size-thumbnail.enum';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
})
export class CharacterItemComponent implements OnInit {
  @Input() character!: Character;
  size: string = SizeThumbnail.standard_xlarge;

  constructor() {}

  ngOnInit(): void {}
}
