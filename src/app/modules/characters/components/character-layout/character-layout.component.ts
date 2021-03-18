import { Component, OnInit } from '@angular/core';
import { TitlePageService } from 'src/app/modules/main/services/title-page.service';
@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.scss'],
})
export class CharacterLayoutComponent implements OnInit {
  constructor(private titleService: TitlePageService) {}

  ngOnInit(): void {
    this.titleService.titleSubject.next('Characters');
  }
}
