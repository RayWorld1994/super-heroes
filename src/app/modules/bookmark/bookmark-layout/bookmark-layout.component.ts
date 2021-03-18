import { TitlePageService } from './../../main/services/title-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark-layout',
  templateUrl: './bookmark-layout.component.html',
  styleUrls: ['./bookmark-layout.component.scss'],
})
export class BookmarkLayoutComponent implements OnInit {
  constructor(private titleService: TitlePageService) {}

  ngOnInit(): void {
    this.titleService.titleSubject.next('Bookmark');
  }
}
