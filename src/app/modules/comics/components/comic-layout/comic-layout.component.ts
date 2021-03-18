import { Component, OnInit } from '@angular/core';
import { TitlePageService } from 'src/app/modules/main/services/title-page.service';

@Component({
  selector: 'app-comic-layout',
  templateUrl: './comic-layout.component.html',
  styleUrls: ['./comic-layout.component.scss'],
})
export class ComicLayoutComponent implements OnInit {
  constructor(private titleService: TitlePageService) {}

  ngOnInit(): void {
    this.titleService.titleSubject.next('Comics');
  }
}
