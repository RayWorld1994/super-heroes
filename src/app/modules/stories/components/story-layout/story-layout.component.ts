import { Component, OnInit } from '@angular/core';
import { TitlePageService } from 'src/app/modules/main/services/title-page.service';

@Component({
  selector: 'app-story-layout',
  templateUrl: './story-layout.component.html',
  styleUrls: ['./story-layout.component.scss'],
})
export class StoryLayoutComponent implements OnInit {
  constructor(private titleService: TitlePageService) {}

  ngOnInit(): void {
    this.titleService.titleSubject.next('Stories');
  }
}
